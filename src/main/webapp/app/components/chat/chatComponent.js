System.register(["angular2/core", "../../DOM/circleSession/message"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, message_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            /**
             * Created by Jorda on 3/6/2016.
             */
            ChatComponent = (function () {
                function ChatComponent() {
                    this.messages = [];
                    this.message = "";
                }
                ChatComponent.prototype.connect = function () {
                    var _this = this;
                    var socket = new SockJS('/Kandoe/chat'); //local
                    //var socket = new SockJS('/chat'); // wildfly
                    this.stompClient = Stomp.over(socket);
                    this.stompClient.connect({}, function (frame) {
                        _this.setConnected(true);
                        _this.stompClient.subscribe('/topic/chat', function (greeting) {
                            _this.showMessage(JSON.parse(greeting.body));
                        });
                    });
                };
                ChatComponent.prototype.setConnected = function (conn) {
                    document.getElementById('connect').disabled = conn;
                    document.getElementById('disconnect').disabled = !conn;
                };
                ChatComponent.prototype.disconnect = function () {
                    if (this.stompClient != null) {
                        this.stompClient.disconnect();
                    }
                    this.setConnected(false);
                };
                ChatComponent.prototype.sendMessage = function (chatElement) {
                    var token = localStorage.getItem("id_token");
                    this.stompClient.send("/chat", {}, JSON.stringify({ 'name': this.message, 'token': token }));
                    this.message = "";
                    chatElement.focus();
                };
                ChatComponent.prototype.showMessage = function (json) {
                    this.messages.push(message_1.Message.fromJson(json));
                };
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'chat',
                        templateUrl: 'app/components/chat/chat.html',
                        styleUrls: ['app/css/chat.css'],
                        inputs: ['messages']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChatComponent);
                return ChatComponent;
            })();
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
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
//# sourceMappingURL=chatComponent.js.map