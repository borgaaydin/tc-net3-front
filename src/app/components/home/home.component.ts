import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/User';
import { UserService, CourseService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
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
      console.log(this.courses);
    }
}
