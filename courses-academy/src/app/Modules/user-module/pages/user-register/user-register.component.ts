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

    handleJoin() {
        if (this._isModelValid(this.model)) {
            this.authService.registerUserAsync(this.model)
                .then((user: User) => {
                    location.reload();
                });
        }
    }

    private _isModelValid(model: RegisterModel): boolean {
        if (!model.Email) return false;
        if (!model.Password) return false;
        if (!model.FirstName || !model.LastName) return false;

        return true;
    }
}
