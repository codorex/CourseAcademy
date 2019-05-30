import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../Models/CourseModels/course.model';
import { Injectable } from '@angular/core';

@Injectable()
export default class CourseService {
    constructor(private httpClient : HttpClient) { }

    getAllAsync() : Promise<Course[]>{
       return this.httpClient
            .get<Course[]>(`${environment.baseApiUri}/courses`)
            .toPromise();
    }

    getByIdAsync(id: number): Promise<Course>{
        return this.httpClient
            .get<Course>(`${environment.baseApiUri}/courses/${id}`)
            .toPromise();
    }

    createCourseAsync(course: Course) : Promise<Course>{
        return this.httpClient
            .post<Course>(`${environment.baseApiUri}/courses`, course)
            .toPromise();
    }

    updateCourseAsync(course: Course): Promise<Course>{
        return this.httpClient
            .put<Course>(`${environment.baseApiUri}/courses/${course.id}`, course)
            .toPromise();
    }

    getAllForUser(userId: number): Promise<Course[]>{
       return this._getCoursesForUserAsync(userId, true);
    }

    getNotJoinedForUser(userId: number): Promise<Course[]>{
       return this._getCoursesForUserAsync(userId, false);
    }

    removeCourseAsync(id: number) : Promise<any>{
        return this.httpClient
        .delete(`${environment.baseApiUri}/courses/${id}`)
        .toPromise();
    }

    addParticipantAsync(courseId: number, userId: number): Promise<any>{
        return new Promise(async (resolve, reject) => {
            let course = await this.getByIdAsync(courseId);
            if(course && !course.Participants.some(id => id === userId)){
                course.Participants.push(userId);
                await this.updateCourseAsync(course);

                resolve();
            } else {
                reject();
            }
        });
    }

    removeParticipantAsync(courseId: number, userId: number): Promise<any>{
        return new Promise(async (resolve, reject) => {
            let course = await this.getByIdAsync(courseId);
            if(course && course.Participants.some(id => id === userId)){
                let indexToRemove = course.Participants
                    .indexOf(userId);

                course.Participants.splice(indexToRemove, 1);

                await this.updateCourseAsync(course);

                resolve();
            } else {
                reject();
            }
        });
    }

    private _getCoursesForUserAsync(userId: number, hasJoined: boolean){
        return new Promise<Course[]>(async (resolve, reject) => {
            let allCourses: Course[] = await this.getAllAsync();
            let result: Course[] = allCourses
                .filter(c => {
                    if(hasJoined){
                        return c.Participants.some(p => p === userId)
                    }
                    
                    return !c.Participants.some(p => p === userId)
                });

                resolve(result);
        });
    }
}