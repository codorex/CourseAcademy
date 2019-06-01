import { BlockingUserMessage } from './../../../../Models/Messages/user-messages/blocking-user.message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../../Services/authentication.service';
import { MessagingService, Listener } from '../../../../Services/messaging.service';
import { UserService } from '../../../../Services/user.service';
import { UnblockingUserMessage } from '../../../../Models/Messages/user-messages/unblocking-user.message';
import User from '../../../../Models/UserModels/user.model';

@Component({
    selector: 'app-user-all',
    templateUrl: './user-all.component.html',
    styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

    blockingUserListener: Listener;
    unblockingUserListener: Listener;

    users: User[] = [];

    constructor(
        private authService: AuthenticationService,
        private messagingService: MessagingService,
        private userService: UserService
    ) { }

    async ngOnInit() {
        this._registerBlockingUserListener();
        this._registerUnblockingUserListener();

        this.users = await this._getAllUsersButCurrentAsync();
    }

    ngOnDestroy(){
        this.messagingService.unsubscribe('blocking_user', this.blockingUserListener);
        this.messagingService.unsubscribe('unblocking_user', this.unblockingUserListener);
    }

    private async _getAllUsersButCurrentAsync(): Promise<User[]>{
        return (await this.userService.getAllUsersAsync(true))
            .filter(u => u.id !== this.authService.getCurrentUser().id);
    }

    private _registerBlockingUserListener(): void {
        this.blockingUserListener = {
            listener: this,
            callback: async (message: BlockingUserMessage) => {
                let user = await this.userService.blockUserAsync(message.UserId);
                this.users = await this._getAllUsersButCurrentAsync();
            }
        };

        this.messagingService.listen('blocking_user', this.blockingUserListener);
    }

    private _registerUnblockingUserListener(): void {
        this.unblockingUserListener = {
            listener: this,
            callback: async (message: UnblockingUserMessage) => {
                let user = await this.userService.unblockUserAsync(message.UserId);
                this.users = await this._getAllUsersButCurrentAsync();
            }
        };

        this.messagingService.listen('unblocking_user', this.unblockingUserListener);
    }

}
