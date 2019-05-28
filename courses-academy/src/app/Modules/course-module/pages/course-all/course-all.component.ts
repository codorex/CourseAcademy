import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit } from '@angular/core';
import CourseService from '../../../../Services/course.service';
import { MessagingService } from '../../../../Services/messaging.service';

@Component({
  selector: 'app-course-all',
  templateUrl: './course-all.component.html',
  styleUrls: ['./course-all.component.css']
})
export class CourseAllComponent implements OnInit {

  constructor(
    private courseService : CourseService, 
    private messagingService: MessagingService) { }

  courses: Course[];

  ngOnInit() {
    this.messagingService.listen('course_added', 
    { listener: this, callback: (course: Course) => {
      this.courseService.createCourseAsync(course)
      .subscribe(_ => this.courses.push(course));
    }})

    this.messagingService.listen('course_removing', 
    { listener: this, callback: (id: number) => {
      console.log(`remove requested for ${id}}`);
    }})

    this.requestAllCoursesAsync();
  }

  onCourseRemoving(id: number){
    console.log(id);
  }

  requestAllCoursesAsync(callback?){
    this.courseService.getAllAsync()
    .subscribe(courses => {
      this.courses = courses;

      if(callback){
        callback(courses);
      }
    });
  }
}
