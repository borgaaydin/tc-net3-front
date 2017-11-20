import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/User';
import { UserService } from '../../services/index';
import { CourseService } from '../../services/course.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    courses: {};

    constructor(private userService: UserService,
                private courseService: CourseService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.getMyCourses();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    private getMyCourses() {
      this.courseService.getMyCourses().subscribe(courses => { this.courses = courses; });

    }
}
