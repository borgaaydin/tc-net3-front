import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../classes/user';
import { AlertService, UserService, SubjectService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    currentUser: User;
    model: any = {};
    subjects: any = [];
    loading = false;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private subjectService: SubjectService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.model = this.currentUser;
        this.loadUser();
        this.loadSubjects();

        this.dropdownSettings = {
          singleSelection: false,
          text: 'Choisissez vos matières',
          selectAllText: 'Tout choisir',
          unSelectAllText: 'Tout supprimer',
          enableSearchFilter: true,
          classes: 'myclass custom-class',
          searchPlaceholderText: 'Recherche',
          groupBy: 'year',
          enableCheckAll: false
        };
    }

    private loadUser() {
        this.userService.current().subscribe(user => { this.model = user; });
    }

    private loadSubjects() {
        this.subjectService.getAll().subscribe(subjects => {
          this.subjects = subjects;
          const dropdownSubjects = JSON.parse(JSON.stringify(this.subjects)
            .split('"_id":').join('"id":').split('"subject":').join('"itemName":'));
          this.dropdownList = dropdownSubjects;
          this.selectedItems = this.model.subjects;
        });
    }

    update() {
        this.loading = true;
        if (!this.model.isTeacher) {
          this.model.subjects = [];
          this.selectedItems.forEach(eachObj => {
            const object = {'id': eachObj.id, 'itemName': eachObj.itemName};
            this.model.subjects.push(object);
          });
        }
        this.userService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
