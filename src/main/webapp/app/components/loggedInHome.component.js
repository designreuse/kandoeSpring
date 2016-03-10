System.register(["angular2/core", "angular2/router", "../security/TokenHelper", "../DOM/users/user", "../service/userService", "../service/sessionService"], function(exports_1) {
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
    var core_1, router_1, TokenHelper_1, user_1, userService_1, sessionService_1;
    var LoggedInHome;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (sessionService_1_1) {
                sessionService_1 = sessionService_1_1;
            }],
        execute: function() {
            LoggedInHome = (function () {
                function LoggedInHome(_sessionService, router, userService) {
                    this._sessionService = _sessionService;
                    this.router = null;
                    this.user = user_1.User.createEmpty();
                    this.sessions = [];
                    this.router = router;
                    this.userService = userService;
                }
                LoggedInHome.prototype.ngOnInit = function () {
                    var _this = this;
                    this._sessionService.getUserSessions().subscribe(function (sessions) {
                        _this.sessions = sessions;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    $('.show-btn').on('click', function () {
                        $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
                    });
                    $('.card-reveal .close').on('click', function () {
                        $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
                    });
                };
                LoggedInHome.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                LoggedInHome.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                LoggedInHome = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'loggedin-home',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/loggedInHome.html'
                    }), 
                    __metadata('design:paramtypes', [sessionService_1.SessionService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService])
                ], LoggedInHome);
                return LoggedInHome;
                var _a;
            })();
            exports_1("LoggedInHome", LoggedInHome);
        }
    }
});
//# sourceMappingURL=loggedInHome.component.js.map