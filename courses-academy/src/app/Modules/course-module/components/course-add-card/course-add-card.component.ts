import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../../../Services/messaging.service';

@Component({
    selector: 'app-course-add-card',
    templateUrl: './course-add-card.component.html',
    styleUrls: ['./course-add-card.component.css']
})
export class CourseAddCardComponent implements OnInit {

    private courseModel: any = {
        Title: '',
        Description: ''
    }

    showForm: boolean = false;

    constructor(private messagingService: MessagingService) { }
    
    ngOnInit() { }

    handleCreateCourse() {
        this.showForm = true;
    }

    handleSaveCourse(){
        let course: Course = {
            id: 0,
            Title: this.courseModel.Title,
            Description: this.courseModel.Description,
            Rating: 0,
            Participants: []
        };

        this.messagingService.send('course_adding', course);
        
        this._clearInput();
    }

    handleHideCreateCourseForm(){
        this._clearInput();
    }

    private _clearInput(){
        this.courseModel = {
            Title: '',
            Description: ''
        };

        this.showForm = false;
    }
}
