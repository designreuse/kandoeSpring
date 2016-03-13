import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Http} from "angular2/http";
import {Message} from "../../DOM/circleSession/message";

@Component({
    selector: 'chat',
    templateUrl: 'app/components/chat/chat.html',
    styleUrls:  ['app/css/chat.css'],
    inputs: ['messages']
})

export class ChatComponent {
    stompclient;
    messages: Message[] = [];
    message: String = "";

    constructor() {

    }

    connect() {
        var socket = new SockJS('/Kandoe/chat'); //local
        //var socket = new SockJS('/chat'); // wildfly
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            this.setConnected(true);

            this.stompClient.subscribe('/topic/chat', greeting => {
                this.showMessage(JSON.parse(greeting.body));
            });
        });
    }

    setConnected(conn: boolean) {
        document.getElementById('connect').disabled = conn;
        document.getElementById('disconnect').disabled = !conn;
    }

    disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
        this.setConnected(false);
    }

    sendMessage(chatElement) {
        var token = localStorage.getItem("id_token");

        this.stompClient.send("/chat", {}, JSON.stringify({'name': this.message, 'token': token}));
        this.message = "";
        chatElement.focus();
    }

    showMessage(json: string) {
        this.messages.push(Message.fromJson(json));
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
