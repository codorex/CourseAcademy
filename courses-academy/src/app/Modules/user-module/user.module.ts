import { IconComponent } from './shared/icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';

import { UserAllComponent } from './pages/user-all/user-all.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
@NgModule({
    declarations: [
        UserAllComponent, 
        UserListComponent, 
        UserCardComponent, 
        UserRegisterComponent, 
        UserLoginComponent,
        IconComponent
    ],
    imports: [
        UserRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: []
})
export class UserModule { }