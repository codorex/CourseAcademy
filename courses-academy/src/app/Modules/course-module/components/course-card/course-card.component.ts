import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../../../Services/messaging.service';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { Role } from '../../../../Enums/role.enum';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(
        private messagingService: MessagingService,
        private authService: AuthenticationService) { }

    @Input() course: Course;

    ngOnInit() {
        this.isAdmin = this.authService.isInRole(Role.Admin)
    }

    handleCourseRemoving() {
        this.messagingService.send('course_removing', this.course.id);
    }

}
