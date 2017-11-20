import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { UserService, CourseService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    courses: {};
    absences: {};
    today: number;

    constructor(
        private userService: UserService,
        private courseService: CourseService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        if ( this.currentUser.isTeacher ) {
            this.getMyCourses();
        } else {
            this.getMyAbsences();
        }

        var d = new Date();
        d.setHours(23,59,59,999);
        this.today = d.getTime();
    }

    private getMyCourses() {
      this.courseService.getMyCourses().subscribe(courses => { this.courses = courses; });
    }

    private getMyAbsences() {
        this.userService.getMyAbsences().subscribe(absences => { this.absences = absences; });
    }
}
