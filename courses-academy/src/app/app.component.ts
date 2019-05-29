import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';
import { Role } from './Enums/role.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'courses-academy';
    isAuthenticated: boolean = false;
    isAdmin: boolean = false;

    constructor(private authService: AuthenticationService) { }

    ngOnInit(){
        this.isAuthenticated = this.authService.isAuthenticated();
        this.isAdmin = this.authService.isInRole(Role.Admin);
    }

    handleLogout(){
        this.authService.signOut();
    }
}
