import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {Http} from "angular2/http";
/**
 * Created by Jorda on 3/6/2016.
 */

@Component({
    selector: 'userprofile',
    templateUrl: 'app/components/chat/chat.html',
    styleUrls:  ['app/css/chat.css'],
    inputs: ['messages']
})

export class ChatComponent {
    http:Http;
    ws;
    stompclient;
    static messages:String[] = [];
    message:String = "empty";

    constructor(http:Http) {
         this.http = http;
         /*this.ws = new SockJs('/Kandoe/chat');
         ChatComponent.messages[0] = ("This is a test message");

         this.stompclient = Stomp.over(ws);

         this.ws.onopen = function () {
         console.log("Connection openned");
         };
         this.ws.onclose = function (event) {
         console.log(event.code);
         };
         this.ws.onmessage = function (data) {
         console.log("incoming message: " + data.data);
         ChatComponent.messages[ChatComponent.messages.length + 1] = data.data;
         };   */
    }

    getMessages():String[] {
        return ChatComponent.messages;
    }

    onSubmit() {
        //alert(this.message);
        this.ws.send(this.message);
        //alert("message sent");
    }

}

/*
 <head>

 </head>
 <div class="container">
 <div>
 <form  class="col-lg-offset-2 col-lg-8" method="post" role="form">
 <div class="form-group">
 <label>TextMessage</label>
 <input type="text" placeholder="Enter chat" class="form-control" id="sendchatmessage">
 </div>
 <div class="row">
 <button type="button" class="btn btn-lg btn-wide btn-primary" onclick="sendName();">Add</button>
 </div>
 </form>
 </div>

 <div>
 <button id="connect" onclick="connect();">Connect</button>
 <button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
 </div>


 <div class="container" id="receivedMessage">

 </div>
 <div *ngFor="#message of getMessages()">
 <p>{{message}}</p>
 </div>
 </div>
 */