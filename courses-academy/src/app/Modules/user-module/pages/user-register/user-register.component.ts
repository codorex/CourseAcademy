import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { CredentialsModel } from '../../../../Models/UserModels/credentials.model';
import User from '../../../../Models/UserModels/user.model';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

    credentials: CredentialsModel = {
        Email: '',
        Password: ''
    };

    constructor(private authService: AuthenticationService) { }

    ngOnInit() { }

    handleJoin(){
        this.authService.registerUserAsync(this.credentials)
            .then((user: User) => {
                location.reload();
            });
    }
}
