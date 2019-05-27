import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { NgModule } from '@angular/core';

import { CourseAllComponent } from './pages/course-all/course-all.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';

@NgModule({
    declarations: [
        CourseAllComponent, 
        CourseListComponent, 
        CourseCardComponent
    ],
    imports: [
        CourseRoutingModule, 
        CommonModule
    ],
    exports: []
})
export class CourseModule { }