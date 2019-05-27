import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes : Routes = [
    { path: 'users', loadChildren: './Modules/user-module/user.module#UserModule' },
    { path: 'courses', loadChildren: './Modules/course-module/course.module#CourseModule' },
    { path: '**', loadChildren: './Modules/course-module/course.module#CourseModule' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }