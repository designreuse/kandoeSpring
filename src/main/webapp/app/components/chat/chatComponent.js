System.register(["angular2/core"], function(exports_1) {
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
    var core_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by Jorda on 3/6/2016.
             */
            ChatComponent = (function () {
                function ChatComponent() {
                    this.messages = [];
                    this.emitMessage = new core_1.EventEmitter();
                    this.message = "";
                }
                ChatComponent.prototype.sendMessage = function (chatElement) {
                    this.emitMessage.emit(this.message);
                    this.message = "";
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
                    __metadata('design:type', Number)
                ], ChatComponent.prototype, "sessionId");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ChatComponent.prototype, "messages");
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
                ], ChatComponent.prototype, "emitMessage");
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