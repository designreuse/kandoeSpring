System.register(["angular2/core", "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /**
             * Created by Jorda on 3/6/2016.
             */
            ChatComponent = (function () {
                function ChatComponent(http) {
                    this.message = "empty";
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
                ChatComponent.prototype.getMessages = function () {
                    return ChatComponent.messages;
                };
                ChatComponent.prototype.onSubmit = function () {
                    //alert(this.message);
                    this.ws.send(this.message);
                    //alert("message sent");
                };
                ChatComponent.messages = [];
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'userprofile',
                        template: "\n    <head>\n\n    </head>\n    <div class=\"container\">\n        <div>\n            <form  class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\">\n                <div class=\"form-group\">\n                    <label>TextMessage</label>\n                    <input type=\"text\" placeholder=\"Enter chat\" class=\"form-control\" id=\"sendchatmessage\">\n                </div>\n                <div class=\"row\">\n                    <button type=\"button\" class=\"btn btn-lg btn-wide btn-primary\" onclick=\"sendName();\">Add</button>\n                </div>\n            </form>\n        </div>\n\n        <div>\n            <button id=\"connect\" onclick=\"connect();\">Connect</button>\n            <button id=\"disconnect\" disabled=\"disabled\" onclick=\"disconnect();\">Disconnect</button>\n        </div>\n\n\n        <div class=\"container\" id=\"receivedMessage\">\n\n        </div>\n        <div *ngFor=\"#message of getMessages()\">\n            <p>{{message}}</p>\n        </div>\n    </div>\n    ",
                        inputs: ['messages']
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], ChatComponent);
                return ChatComponent;
                var _a;
            })();
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
//# sourceMappingURL=chatComponent.js.map