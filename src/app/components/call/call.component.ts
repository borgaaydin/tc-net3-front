import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { User } from '../../classes/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }
  users: {};
  course_id;
  absents:  Array<string> = [];
  presents: Array<string> = [];
  course: Object;

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.getCourseList(this.course_id);
    this.getCourseInfo(this.course_id);
  }

  private getCourseList(course) {
    this.courseService.getCourseStudentList(course).subscribe(users => { this.users = users; });
  }
  private getCourseInfo(course) {
    this.courseService.getCourseInfoById(course).subscribe(cours => { this.course = cours; });
  }

  private setAbsent(user) {
    if (!user.isMarked) {
      user.isMarked = true;
      this.absents.push(user._id);
    }
  }
  private setPresent(user) {
    if (!user.isMarked) {
      user.isMarked = true;
      this.presents.push(user._id);
    }
  }
  private cheackRollSum() {
    const rollSum = this.absents.length + this.presents.length;
    return rollSum === Object.keys(this.users).length;
  }
  private sendRollCall() {

  }
}
