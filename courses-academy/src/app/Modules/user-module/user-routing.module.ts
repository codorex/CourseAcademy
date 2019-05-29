import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAllComponent } from './pages/user-all/user-all.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';

const routes : Routes = [
    { path: '', component: UserAllComponent },
    { path: 'join', component: UserRegisterComponent },
    { path: 'login', component: UserLoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }