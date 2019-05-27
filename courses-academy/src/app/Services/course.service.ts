import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../Models/CourseModels/course.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export default class CourseService {
    constructor(private httpClient : HttpClient) { }

    getAllAsync() : Observable<Course[]>{
       return this.httpClient.get<Course[]>(`${environment.baseApiUri}/courses`);
    }
}