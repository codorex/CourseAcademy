import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { Role } from '../../../../Enums/role.enum';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(private authService: AuthenticationService) { }

    @Input() courses: Course[];

    ngOnInit() {
        this.isAdmin = this.authService.isInRole(Role.Admin);
    }
}
