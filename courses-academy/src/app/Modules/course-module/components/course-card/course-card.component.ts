import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  constructor() { }

  @Input() course : Course;

  ngOnInit() {
  }

}
