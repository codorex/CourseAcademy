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

    user: any = {
        FullName: '',
        Email: ''
    };

    constructor(private authService: AuthenticationService) { }

    ngOnInit(){
        this.isAuthenticated = this.authService.isAuthenticated();
        this.isAdmin = this.authService.isInRole(Role.Admin);
        
        if(this.isAuthenticated){
            let currentUser = this.authService.getCurrentUser();
            this.user.FullName = currentUser.Name;
            this.user.Email = currentUser.Email;
        }
    }

    handleLogout(){
        this.authService.signOut();
    }
}
