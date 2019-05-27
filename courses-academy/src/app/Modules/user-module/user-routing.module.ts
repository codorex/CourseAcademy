import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAllComponent } from './pages/user-all/user-all.component';

const routes : Routes = [
    { path: '', component: UserAllComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }