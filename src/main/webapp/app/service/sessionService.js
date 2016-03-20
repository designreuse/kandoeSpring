System.register(['rxjs/add/operator/map', "../security/securityService", 'angular2/core', "../DOM/circleSession/session", "../DOM/card", "../DOM/circleSession/message"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var securityService_1, core_1, session_1, card_1, message_1;
    var SessionService;
    return {
        setters:[
            function (_1) {},
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            SessionService = (function () {
                function SessionService(path, securityService) {
                    this.path = path;
                    this.securityService = securityService;
                }
                SessionService.prototype.getSessionById = function (sessionId) {
                    var el = this.securityService.get(this.path + 'sessions/' + sessionId, true)
                        .map(function (res) { return res.json(); });
                    console.log(JSON.stringify(el));
                    return el.map(function (session) { return session_1.Session.fromJson(session); });
                };
                SessionService.prototype.getUserSessions = function () {
                    return this.securityService.get(this.path + 'sessions/currentUser', true)
                        .map(function (res) { return res.json(); })
                        .map(function (sessions) { return sessions.map(function (session) { return session_1.Session.fromJson(session); }); });
                };
                SessionService.prototype.createSession = function (session) {
                    return this.securityService.post(this.path + 'sessions', JSON.stringify(session), true);
                };
                SessionService.prototype.addCards = function (cardIds, sessionId) {
                    var cards = [];
                    for (var i = 0; i < cardIds.length; i++) {
                        var c = new card_1.Card();
                        c.cardId = cardIds[i];
                        cards[i] = c;
                    }
                    return this.securityService.post(this.path + 'sessions/' + sessionId + '/addCards', JSON.stringify(cards), true)
                        .map(function (res) { return res.json(); })
                        .map(function (session) { return session_1.Session.fromJson(session); });
                };
                SessionService.prototype.getChatHistory = function (sessionId) {
                    return this.securityService.get(this.path + 'sessions/' + sessionId + '/chat', true)
                        .map(function (res) { return res.json(); })
                        .map(function (messages) { return messages.map(function (message) { return message_1.Message.fromJson(message); }); });
                };
                SessionService.prototype.checkCanPlay = function (sessionId) {
                    return this.securityService.get(this.path + 'sessions/' + sessionId + '/canPlay', true);
                };
                SessionService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [String, securityService_1.SecurityService])
                ], SessionService);
                return SessionService;
            })();
            exports_1("SessionService", SessionService);
        }
    }
});
//# sourceMappingURL=sessionService.js.map