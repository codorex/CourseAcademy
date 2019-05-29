import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAllComponent } from './pages/user-all/user-all.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { AdminCanActivate } from '../../_guards/admin.guard';
import { UnauthenticatedCanActivate } from '../../_guards/unauthenticated.guard';

const routes : Routes = [
    { path: '', component: UserAllComponent, canActivate: [AdminCanActivate] },
    { path: 'join', component: UserRegisterComponent, canActivate: [UnauthenticatedCanActivate] },
    { path: 'login', component: UserLoginComponent, canActivate: [UnauthenticatedCanActivate] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }