import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { User } from '../../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  constructor(private router: Router,
              private alertService: AlertService,
              private courseService: CourseService,
              private route: ActivatedRoute) { }
  users: {};
  course_id;
  absents:  Array<string> = [];
  presents: Array<string> = [];
  course: any = {};
  response;
  noStudents = 0;

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.getCourseList(this.course_id);
    this.getCourseInfo(this.course_id);
  }

  private getCourseList(course) {
    this.courseService.getCourseStudentList(course).subscribe(users => {
      this.users = users;
      this.noStudents = Object.keys(this.users).length; });
  }
  private getCourseInfo(course) {
    this.courseService.getCourseInfoById(course).subscribe(cours => { this.course = cours; });
  }

  private setAbsent(user) {
    if (!user.isMarked) {
      user.isMarked = true;
      user.isAbs = true;
      user.isPres = false;
      this.absents.push(user._id);
    } else {
        if (user.isPres) {
          user.isPres = false;
          user.isAbs = true;
          let index = this.presents.indexOf(user._id);
          if (index > -1) {
              this.presents.splice(index, 1);
          }
          this.absents.push(user._id);
        } else {
            user.isMarked = false;
            user.isAbs = false;
            let index = this.absents.indexOf(user._id);
            if (index > -1) {
                this.absents.splice(index, 1);
            }
        }
    }
  }

  private setPresent(user) {
    if (!user.isMarked) {
      user.isMarked = true;
      user.isPres = true;
      user.isAbs = false;
      this.presents.push(user._id);
  } else {
      if (user.isAbs) {
        user.isPres = true;
        user.isAbs = false;
        let index = this.absents.indexOf(user._id);
        if (index > -1) {
            this.absents.splice(index, 1);
        }
        this.presents.push(user._id);
      } else {
          user.isMarked = false;
          user.isPres = false;
          let index = this.presents.indexOf(user._id);
          if (index > -1) {
              this.presents.splice(index, 1);
          }
      }
  }
  }
  checkRollSum() {
    const rollSum = this.absents.length + this.presents.length;
    return rollSum === Object.keys(this.users).length;
  }
  sendRollCall() {
    if (this.checkRollSum()) {
      const roll = {'absent' : [], 'present': []};
      roll.absent = this.absents;
      roll.present = this.presents;

      this.courseService.postRollcall(this.course_id, roll).subscribe(
        data => {
          this.alertService.success('Appel est enregistré', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
        });
    }
  }
}
