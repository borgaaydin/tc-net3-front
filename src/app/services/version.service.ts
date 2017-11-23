import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class VersionService {
    constructor(private http: Http) { }

    get() {
        return this.http.get('/version').map((response: Response) => response.json());
    }
}
