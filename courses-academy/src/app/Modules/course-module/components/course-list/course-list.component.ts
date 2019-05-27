import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor() { }

  @Input() courses : Course[];

  @Output() createCourseRequested: EventEmitter<Course> = new EventEmitter<Course>();

  ngOnInit() {
   
  }

  onCreateCourseClicked(args : Course){
    this.createCourseRequested.emit(args);
  }

}
