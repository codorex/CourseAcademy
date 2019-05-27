import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit } from '@angular/core';
import CourseService from '../../../../Services/course.service';

@Component({
  selector: 'app-course-all',
  templateUrl: './course-all.component.html',
  styleUrls: ['./course-all.component.css']
})
export class CourseAllComponent implements OnInit {

  constructor(private courseService : CourseService) { }

  courses: Course[];

  ngOnInit() {
    this.courseService.getAllAsync()
      .subscribe(courses => this.courses = courses);
  }
}
