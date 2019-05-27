import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAllComponent } from './pages/user-all/user-all.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        UserAllComponent, 
        UserListComponent, 
        UserCardComponent
    ],
    imports: [
        UserRoutingModule,
        CommonModule
    ],
    exports: []
})
export class UserModule { }