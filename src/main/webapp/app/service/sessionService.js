System.register(['rxjs/add/operator/map', "../security/securityService", 'angular2/core', "../DOM/circleSession/session", "../DOM/card"], function(exports_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var securityService_1, core_1, session_1, card_1;
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
            }],
        execute: function() {
            SessionService = (function () {
                function SessionService(path, securityService) {
                    this.path = path;
                    this.securityService = securityService;
                }
                SessionService.prototype.getSessionById = function (sessionId) {
                    return this.securityService.get(this.path + 'sessions/' + sessionId, true)
                        .map(function (res) { return res.json(); })
                        .map(function (session) { return session_1.Session.fromJson(session); });
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