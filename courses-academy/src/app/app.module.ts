import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import CourseService from './Services/course.service';
import { MessagingService } from './Services/messaging.service';
import { AuthenticationService } from './Services/authentication.service';
import { UserService } from './Services/user.service';
import { AdminCanActivate } from './_guards/admin.guard';
import { AuthenticatedCanActivate } from './_guards/authenticated.guard';
import { UnauthenticatedCanActivate } from './_guards/unauthenticated.guard';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        CourseService,
        MessagingService,
        UserService,
        AuthenticationService,
        AdminCanActivate,
        AuthenticatedCanActivate,
        UnauthenticatedCanActivate
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
