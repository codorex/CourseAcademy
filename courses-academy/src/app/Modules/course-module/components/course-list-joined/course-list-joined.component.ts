import { Component, OnInit, Input } from '@angular/core';
import CourseService from '../../../../Services/course.service';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { MessagingService } from '../../../../Services/messaging.service';
import { Course } from '../../../../Models/CourseModels/course.model';
import { Role } from '../../../../Enums/role.enum';

@Component({
    selector: 'app-course-list-joined',
    templateUrl: './course-list-joined.component.html',
    styleUrls: ['./course-list-joined.component.css']
})
export class CourseListJoinedComponent implements OnInit {

    isAdmin: boolean = false;

    @Input() courses: Course[] = [];

    constructor(
        private courseService: CourseService,
        private authService: AuthenticationService,
        private messagingService: MessagingService) { }

    ngOnInit() {
        this.isAdmin = this.authService.isInRole(Role.Admin);
    }

}
