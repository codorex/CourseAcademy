import { Course } from './../../../../Models/CourseModels/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import CourseService from '../../../../Services/course.service';
import { MessagingService, Listener } from '../../../../Services/messaging.service';

@Component({
	selector: 'app-course-all',
	templateUrl: './course-all.component.html',
	styleUrls: ['./course-all.component.css']
})
export class CourseAllComponent implements OnInit, OnDestroy {

    courseAddingListener: Listener;
	courseRemovingListener: Listener;

	courses: Course[];

	constructor(
		private courseService: CourseService,
		private messagingService: MessagingService) {

		this.courseAddingListener = {
			listener: this,
			callback: (course: Course) => {
				this.courseService.createCourseAsync(course)
					.subscribe(_ => this.courses.push(course));
			}
		};

		this.courseRemovingListener = {
			listener: this,
			callback: async (id: number) => {
                this.courseService.removeCourseAsync(id)
                .subscribe(_ => this.requestAllCoursesAsync());
			}
		};
	}

	ngOnInit() {
		this.messagingService.listen('course_adding', this.courseAddingListener)
		this.messagingService.listen('course_removing', this.courseRemovingListener)

		this.requestAllCoursesAsync();
	}

	requestAllCoursesAsync() {
		this.courseService.getAllAsync()
			.subscribe(courses => this.courses = courses);
	}

	ngOnDestroy() {
		this.messagingService.unsubscribe("course_adding", this.courseAddingListener);
		this.messagingService.unsubscribe("course_removing", this.courseRemovingListener);
	}
}
