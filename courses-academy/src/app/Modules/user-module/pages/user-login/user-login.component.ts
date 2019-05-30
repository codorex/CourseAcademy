import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { CredentialsModel } from '../../../../Models/UserModels/credentials.model';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    credentials: CredentialsModel = {
        Email: '',
        Password: ''
    };

    errorState: string = "";

    constructor(private authService: AuthenticationService) { }

    ngOnInit() { }

    handleSignIn(){
        this.authService.loginAsync(this.credentials)
            .catch(err => this.errorState = err);
    }

}
