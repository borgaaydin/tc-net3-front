import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Subject } from '../classes/subject';

@Injectable()
export class SubjectService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/courses/subjects').map((response: Response) => response.json());
    }
}
