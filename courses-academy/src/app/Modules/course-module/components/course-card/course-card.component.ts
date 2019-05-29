import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../../../Services/messaging.service';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { Role } from '../../../../Enums/role.enum';
import { JoiningCourseMessage } from '../../../../Models/Messages/joining-course.message';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

    isAuthenticated: boolean = false;
    isAdmin: boolean = false;

    constructor(
        private messagingService: MessagingService,
        private authService: AuthenticationService) { }

    @Input() course: Course;

    ngOnInit() {
        this.isAdmin = this.authService.isInRole(Role.Admin);
        this.isAuthenticated = this.authService.isAuthenticated();
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

}
