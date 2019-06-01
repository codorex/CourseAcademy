import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../Models/UserModels/user.model';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService{
    constructor(
        private httpClient: HttpClient) { }

    private usersEndpoint: string = 'users';

    getUserAsync(id: number): Promise<User>{
        return this.httpClient
            .get<User>(`${environment.baseApiUri}/${this.usersEndpoint}/${id}`)
            .toPromise();
    }

    getAllUsersAsync(includeBlocked?: boolean): Promise<User[]>{
        return new Promise<User[]>(async (resolve, reject) => {
            let users: User[] = await this.httpClient
                .get<User[]>(`${environment.baseApiUri}/${this.usersEndpoint}`)
                .toPromise();

            users = includeBlocked ? users : users.filter(u => u.IsBlocked === false);
            resolve(users);
        });
    }

    createUserAsync(user: User): Promise<User>{
        return this.httpClient
            .post<any>(`${environment.baseApiUri}/${this.usersEndpoint}`, user)
            .toPromise();
    }

    findByEmailAsync(email: string): Promise<User>{
        return new Promise<User>(async (resolve, _) => {
            let allUsers = await this.getAllUsersAsync();
            let result = allUsers.find(u => u.Email === email);
            resolve(result);
        });
    }

    blockUserAsync(userId: number): Promise<User>{
        return new Promise<User>(async (resolve, reject) => {
            let user = await this.getUserAsync(userId);
            if(!user){
                reject();
                return;
            }

            user.IsBlocked = true;

            await this.httpClient
                .put<User>(`${environment.baseApiUri}/${this.usersEndpoint}/${userId}`, user)
                .toPromise();
            
            resolve();
        });
    }

    unblockUserAsync(userId: number): Promise<User>{
        return new Promise<User>(async (resolve, reject) => {
            let user = await this.getUserAsync(userId);
            if(!user){
                reject();
                return;
            }
            
            user.IsBlocked = false;

            await this.httpClient
                .put<User>(`${environment.baseApiUri}/${this.usersEndpoint}/${userId}`, user)
                .toPromise();
            
            resolve();
        });
    }
}