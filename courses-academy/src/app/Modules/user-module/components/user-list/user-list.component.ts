import { Component, OnInit, Input } from '@angular/core';
import User from '../../../../Models/UserModels/user.model';
import { Role } from '../../../../Enums/role.enum';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    @Input() users: User[];

    mockUser: User = {
        Name: "(a user's name)",
        Email: "example@email.com" ,
        Password: '',
        id: -1,
        IsBlocked: false,
        Role: Role.User
    };

    constructor() { }

    ngOnInit() { }

}
