import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-add-card',
  templateUrl: './course-add-card.component.html',
  styleUrls: ['./course-add-card.component.css']
})
export class CourseAddCardComponent implements OnInit {

  constructor() { }

  @Output() createCourseClicked : EventEmitter<Course> = new EventEmitter<Course>();

  ngOnInit() {
  }

  handleCreateCourseClicked(){
    this.createCourseClicked.emit(
        { Title: 'Test', Description: 'test', Rating: 5, id: 0 }
    );
  }

}
