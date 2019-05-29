import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../Services/authentication.service';
import User from '../../../../Models/UserModels/user.model';
import { RegisterModel } from '../../../../Models/UserModels/register.model';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

    model: RegisterModel = {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: ''
    };

    constructor(private authService: AuthenticationService) { }

    ngOnInit() { }

    handleJoin(){
        this.authService.registerUserAsync(this.model)
            .then((user: User) => {
                location.reload();
            });
    }
}
