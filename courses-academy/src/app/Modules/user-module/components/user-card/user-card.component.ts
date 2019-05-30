import { BlockingUserMessage } from './../../../../Models/Messages/user-messages/blocking-user.message';
import { MessagingService } from './../../../../Services/messaging.service';
import { Component, OnInit, Input } from '@angular/core';
import User from '../../../../Models/UserModels/user.model';
import { UnblockingUserMessage } from '../../../../Models/Messages/user-messages/unblocking-user.message';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

    constructor(private messagingService: MessagingService) { }

    @Input() user: User;

    ngOnInit() {
    }

    handleBlockUser(){
        let message: BlockingUserMessage = {
            UserId: this.user.id
        };

        this.messagingService.send('blocking_user', message);
    }

    handleUnblockUser(){
        let message: UnblockingUserMessage = {
            UserId: this.user.id
        };

        this.messagingService.send('unblocking_user', message);
    }
}
