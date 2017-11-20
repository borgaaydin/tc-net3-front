import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../classes/index';
import { AlertService, UserService, SubjectService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    currentUser: User;
    model: any = {};
    subjects: any = {};
    loading = false;
    courses: {};

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
    }

    private loadUser() {
        this.userService.current().subscribe(user => { this.model = user; });
    }

    private loadSubjects() {
        this.subjectService.getAll().subscribe(subjects => {this.subjects = subjects; });
    }

    update() {
        this.loading = true;
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
