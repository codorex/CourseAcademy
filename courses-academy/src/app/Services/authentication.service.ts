import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CredentialsModel } from '../Models/UserModels/credentials.model';
import User from '../Models/UserModels/user.model';
import { Role } from '../Enums/role.enum';
import { RegisterModel } from '../Models/UserModels/register.model';

@Injectable()
export class AuthenticationService{
    constructor(private userService: UserService) { }

    userStorageKey: string = 'user_token';

    registerUserAsync(model: RegisterModel): Promise<User>{
        return new Promise<User>( async (resolve, reject) => {
            const exists: boolean = await this.userService
                .findByEmailAsync(model.Email) !== undefined;

            if(exists === true){
                reject('User already exists');
            } else {
                let user: User = {
                    id: 0,
                    Name: `${model.FirstName} ${model.LastName}`,
                    Email: model.Email,
                    Password: model.Password,
                    IsBlocked: false,
                    Role: Role.User 
                };

                user = await this.userService.createUserAsync(user);

                if(user){
                    this._storeUserInStorage(user);
                } else {
                    reject(user);
                }

                resolve(user);
            }
        });
    }

    loginAsync(credentials: CredentialsModel): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            const invalidCredsMessage: string = 'Invalid credentials!';

            if(!credentials){
                reject(invalidCredsMessage);
            }

            let user = await this.userService.findByEmailAsync(credentials.Email);

            if(!user || user.Password !== credentials.Password){
                reject(invalidCredsMessage);
            } else {
                this._storeUserInStorage(user);
                resolve();
                location.reload();
            }
        });
    }

    signOut(): void{
        this._removeUserFromStorage();
        location.reload();
    }

    isAuthenticated(): boolean{
        return this._getUserFromStorage() !== undefined;
    }

    isInRole(role: Role): boolean {
        if(this.isAuthenticated() === false){
            return false;
        }

        let user = this.getCurrentUser();
        return user.Role === role;
    }

    getCurrentUser(): User {
        return this._getUserFromStorage();
    }

    private _storeUserInStorage(user: User): void{
        let userJson = JSON.stringify(user);
        
        if(localStorage.getItem(this.userStorageKey)){
            localStorage.removeItem(this.userStorageKey);
        }

        localStorage.setItem(this.userStorageKey, userJson);
    }

    private _getUserFromStorage(): User{
        if(!localStorage.getItem(this.userStorageKey)){
            return undefined;
        }

        let user: User = JSON.parse(localStorage.getItem(this.userStorageKey));

        return user;
    }

    private _removeUserFromStorage(): void{
        localStorage.removeItem(this.userStorageKey);
    }
}