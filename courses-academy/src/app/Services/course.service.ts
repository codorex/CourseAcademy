import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../Models/CourseModels/course.model';
import { Injectable } from '@angular/core';
import { UserRating } from '../Models/CourseModels/user-rating';

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

    rateCourseAsync(courseId: number, userId: number, rating: number): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            let course: Course = await this.getByIdAsync(courseId);
            if(!course || this.userHasRated(course, userId)){
                reject();
                return;
            }

            course.UserRatings.push({
                UserId: userId,
                Rating: rating
            });

            await this.updateCourseAsync(course);

            resolve();
        });
    }

    userHasRated(course: Course, userId: number): boolean{
        return course.UserRatings && course.UserRatings.some((r: UserRating) => r.UserId === userId);
    }

    getUserRatingAsync(courseId: number, userId: number): Promise<UserRating>{
        return new Promise<UserRating>(async (resolve, reject) => {
            const defaultValue: UserRating = { UserId: userId, Rating: 0 };

            let course = await this.getByIdAsync(courseId);

            if(!course || !this.userHasRated(course, userId)){
                resolve(defaultValue);
            }

            let rating: UserRating = course.UserRatings.find(r => r.UserId === userId);
            return rating || resolve(defaultValue);
        });
    }

    getTotalRatingAsync(courseId: number): Promise<number>{
        return new Promise(async (resolve, reject) => {
            let course = await this.getByIdAsync(courseId);
            if(!course){
                reject();
                return 0;
            }

            let totalRating = 0;
            course.UserRatings.map(r => totalRating += r.Rating);

            return totalRating;
        });
    }

    getUserRating(course: Course, userId: number): UserRating {
        const defaultValue: UserRating = { UserId: userId, Rating: 0 };
        
        if(!this.userHasRated(course, userId)){
            return defaultValue;
        }

        return course.UserRatings.find(r => r.UserId === userId) || defaultValue;
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