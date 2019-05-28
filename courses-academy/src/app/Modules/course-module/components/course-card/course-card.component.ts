import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../../../Services/messaging.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  constructor(private messagingService: MessagingService) { }

  @Input() course : Course;

  @Output() courseRemoving : EventEmitter<number> = new EventEmitter();

  ngOnInit() {
  }

  handleCourseRemoving(){
    this.messagingService.send('course_removing', this.course);

    this.courseRemoving.emit(this.course.id);
  }

}
