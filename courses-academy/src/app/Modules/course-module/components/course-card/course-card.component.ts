import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../../../Services/messaging.service';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { Role } from '../../../../Enums/role.enum';
import { JoiningCourseMessage } from '../../../../Models/Messages/course-messages/joining-course.message';
import { LeavingCourseMessage } from '../../../../Models/Messages/course-messages/leaving-course.message';
import CourseService from '../../../../Services/course.service';
import { RatingCourse } from '../../../../Models/Messages/course-messages/rating-course.message';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

    isAuthenticated: boolean = false;
    isAdmin: boolean = false;
    rating: number = 0;

    constructor(
        private messagingService: MessagingService,
        private authService: AuthenticationService,
        private courseService: CourseService
    ) { }

    @Input() course: Course;

    ngOnInit() {
        this.isAdmin = this.authService.isInRole(Role.Admin);
        this.isAuthenticated = this.authService.isAuthenticated();

        if(this.isAuthenticated){
            this.rating = this.courseService
                .getUserRating(this.course, this.authService.getCurrentUser().id).Rating;
        }
    }

    handleCourseRemoving() {
        this.messagingService.send('course_removing', this.course.id);
    }

    handleJoinCourse(){
        let message: JoiningCourseMessage = {
            CourseId: this.course.id,
            UserId: this.authService.getCurrentUser().id
        };

        this.messagingService.send('course_joining', message);
    }

    handleLeaveCourse(){
        let message: LeavingCourseMessage = {
            CourseId: this.course.id,
            UserId: this.authService.getCurrentUser().id
        };

        this.messagingService.send('course_leaving', message);
    }

    handleRating(rating: number){
        if(this._shouldAllowRating()){
            let message: RatingCourse = {
                CourseId: this.course.id,
                UserId: this.authService.getCurrentUser().id,
                Rating: rating
            };

            this.messagingService.send('course_rating', message);
        }
    }

    private _shouldDisplayJoin(): boolean{
        return this.isAuthenticated && !this._userHasJoined();
    }

    private _shouldDisplayLeave(): boolean{
        return this.isAuthenticated && this._userHasJoined();
    }

    private _shouldAllowRating(): boolean{
        return this.isAuthenticated && this._userHasJoined();
    }

    private _userHasJoined(): boolean{
        if(!this.authService.isAuthenticated()){
            return false;
        }

        let user = this.authService.getCurrentUser();
        return this.course.Participants
            .some(participantId => participantId === user.id);
    }

}
