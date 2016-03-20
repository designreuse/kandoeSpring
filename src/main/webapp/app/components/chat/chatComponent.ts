import {Component, Input, OnInit, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {Http} from "angular2/http";
import {Message} from "../../DOM/circleSession/message";
import {SessionService} from "../../service/sessionService";
/**
 * Created by Jorda on 3/6/2016.
 */

@Component({
    selector: 'chat',
    templateUrl: 'app/components/chat/chat.html',
    styleUrls:  ['app/css/chat.css'],
    inputs: ['messages']
})

export class ChatComponent{
    @Input() sessionId: number;
    @Input() messages: Message[] = [];
    @Output() emitMessage:EventEmitter<string> = new EventEmitter();
    @Input() sessionName: string;

    message: string = "";

    constructor() {
    }

    sendMessage(chatElement){
        this.emitMessage.emit(this.message);

        this.message="";
        chatElement.focus();
    }

    private getImageSrc(url:string): string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}
