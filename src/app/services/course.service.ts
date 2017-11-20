import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CourseService {
  constructor(private http: Http) { }

  getMyCourses() {
    return this.http.get('/courses').map((response: Response) => response.json());
  }

  getCourseInfoById(cours_id) {
    return this.http.get('/courses/' + cours_id).map((response: Response) => response.json());
  }
}
