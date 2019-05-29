import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import CourseService from '../../../../Services/course.service';
import { MessagingService, Listener } from '../../../../Services/messaging.service';
import { JoiningCourseMessage } from '../../../../Models/Messages/joining-course.message';
import { AuthenticationService } from '../../../../Services/authentication.service';

@Component({
    selector: 'app-course-all',
    templateUrl: './course-all.component.html',
    styleUrls: ['./course-all.component.css']
})
export class CourseAllComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean = false;

    courseAddingListener: Listener;
    courseRemovingListener: Listener;
    courseJoiningListener: Listener;

    allCourses: Course[];
    joinedCourses: Course[];
    notJoinedCourses: Course[];

    constructor(
        private courseService: CourseService,
        private messagingService: MessagingService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();

        this._registerCourseAddingListener();
        this._registerCourseRemovingListener();
        this._registerCourseJoiningListener();

        this.requestAllCoursesAsync();
    }

    requestAllCoursesAsync() {
        let currentUser = this.authService.getCurrentUser();

        if (currentUser) {
            this.courseService.getAllForUser(currentUser.id)
                .then(courses => this.joinedCourses = courses);

            this.courseService.getNotJoinedForUser(currentUser.id)
                .then(courses => this.notJoinedCourses = courses);
        }

        if (this.isAuthenticated == false) {
            this.courseService.getAllAsync()
                .then(courses => this.allCourses = courses);
        }
    }

    ngOnDestroy() {
        this.messagingService.unsubscribe("course_adding", this.courseAddingListener);
        this.messagingService.unsubscribe("course_removing", this.courseRemovingListener);
        this.messagingService.unsubscribe("course_joining", this.courseJoiningListener);
    }

    private _registerCourseAddingListener() {
        this.courseAddingListener = {
            listener: this,
            callback: (course: Course) => {
                this.courseService.createCourseAsync(course)
                    .then(_ => this.notJoinedCourses.push(course));
            }
        };

        this.messagingService.listen('course_adding', this.courseAddingListener);
    }

    private _registerCourseRemovingListener() {
        this.courseRemovingListener = {
            listener: this,
            callback: async (id: number) => {
                this.courseService.removeCourseAsync(id)
                    .then(_ => this.requestAllCoursesAsync());
            }
        };

        this.messagingService.listen('course_removing', this.courseRemovingListener);
    }

    private _registerCourseJoiningListener() {
        this.courseJoiningListener = {
            listener: this,
            callback: async (message: JoiningCourseMessage) => {
                await this.courseService.addParticipantAsync(
                    message.CourseId,
                    message.UserId);

                // TODO: Please, take care of this later, was too tired yesterday ♀♀♀
                this.requestAllCoursesAsync();
            }
        };

        this.messagingService.listen('course_joining', this.courseJoiningListener);
    }
}
