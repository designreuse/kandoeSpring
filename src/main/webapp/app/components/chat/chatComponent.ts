import {Component, Input} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Http} from "angular2/http";
import {Message} from "../../DOM/circleSession/message";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
/**
 * Created by Jorda on 3/6/2016.
 */

@Component({
    selector: 'chat',
    templateUrl: 'app/components/chat/chat.html',
    styleUrls:  ['app/css/chat.css'],
    inputs: ['messages']
})

export class ChatComponent {
    @Input() messages: Message[] = [];
     message: string = "";
    @Input() sessionId: number;
    @Output() emitMessage:EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    sendMessage(chatElement){
        this.emitMessage.emit(this.message);

        chatElement.content="";
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
