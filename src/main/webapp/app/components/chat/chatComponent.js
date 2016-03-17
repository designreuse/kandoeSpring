System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, core_3;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by Jorda on 3/6/2016.
             */
            ChatComponent = (function () {
                function ChatComponent() {
                    this.messages = [];
                    this.message = "";
                    this.emitMessage = new core_3.EventEmitter();
                }
                ChatComponent.prototype.sendMessage = function (chatElement) {
                    this.emitMessage.emit(this.message);
                    chatElement.content = "";
                    chatElement.focus();
                };
                ChatComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ChatComponent.prototype, "messages", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ChatComponent.prototype, "sessionId", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', (typeof (_a = typeof core_3.EventEmitter !== 'undefined' && core_3.EventEmitter) === 'function' && _a) || Object)
                ], ChatComponent.prototype, "emitMessage", void 0);
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
                var _a;
            })();
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
//# sourceMappingURL=chatComponent.js.map