import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseAllComponent } from './pages/course-all/course-all.component';

const routes : Routes = [
    { path: '', component: CourseAllComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }