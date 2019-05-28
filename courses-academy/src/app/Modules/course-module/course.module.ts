import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseAllComponent } from './pages/course-all/course-all.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseAddCardComponent } from './components/course-add-card/course-add-card.component';

@NgModule({
    declarations: [
        CourseAllComponent, 
        CourseListComponent, 
        CourseCardComponent, 
        CourseAddCardComponent
    ],
    imports: [
        CourseRoutingModule, 
        CommonModule,
        FormsModule
    ],
    exports: []
})
export class CourseModule { }