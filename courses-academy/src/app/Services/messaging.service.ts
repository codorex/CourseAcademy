import { Injectable } from '@angular/core';

export interface Listener{
    listener: any;
    callback: Function;
}

@Injectable()
export class MessagingService{

    private _messageMap = {
        // 'example_message': [ subscribers ] 
    }

    constructor() { }

    listen(event: string, listener: Listener): void {
        this._addMessageListener(event, listener);
    }

    send(event: string, args: any): void {
        this._dispatchMessage(event, args);
    }

    unsubscribe(event: string, listener: Listener){
        let messageListeners = this._messageMap[event];

        if(messageListeners){
            let toRemove = messageListeners.find(l => l.listener === listener.listener);
            if(toRemove){
                messageListeners.splice(messageListeners.indexOf(toRemove), 1);
            }
        }
    }

    private _addMessageListener(event: string, listener: Listener): void {
        let messageListeners = this._messageMap[event];
        
        if(!messageListeners || !messageListeners.length){
            messageListeners = [];
            this._messageMap[event] = messageListeners;
        }

        messageListeners.push(listener);
    }

    private _dispatchMessage(event: string, args: any): void {
        let messageListeners = this._messageMap[event];

        if(typeof messageListeners === 'object' && messageListeners.length){
            messageListeners.forEach(listener => listener.callback(args));
        }
    }
}