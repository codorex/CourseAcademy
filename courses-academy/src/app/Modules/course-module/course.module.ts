import { CourseRoutingModule } from './course-routing.module';
import { NgModule } from '@angular/core';

import { CourseAllComponent } from './pages/course-all/course-all.component';

@NgModule({
    declarations: [CourseAllComponent],
    imports: [CourseRoutingModule],
    exports: []
})
export class CourseModule { }