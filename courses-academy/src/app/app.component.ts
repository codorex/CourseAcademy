import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'courses-academy';
    isAuthenticated: boolean = false;

    constructor(private authService: AuthenticationService) { }

    ngOnInit(){
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    handleLogout(){
        this.authService.signOut();
    }
}
