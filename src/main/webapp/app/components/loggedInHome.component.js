System.register(["angular2/core", "angular2/router", "../security/TokenHelper", "../DOM/users/user", "../service/userService", "../service/sessionService", "../service/themeService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, TokenHelper_1, user_1, userService_1, sessionService_1, themeService_1;
    var DateTimeFormat, LoggedInHome;
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
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            }],
        execute: function() {
            LoggedInHome = (function () {
                function LoggedInHome(_sessionService, router, userService, themeservice) {
                    this._sessionService = _sessionService;
                    this.themeservice = themeservice;
                    this.router = null;
                    this.user = user_1.User.createEmpty();
                    this.sessions = [];
                    this.router = router;
                    this.userService = userService;
                }
                LoggedInHome.prototype.ngOnInit = function () {
                    var _this = this;
                    this._sessionService.getUserSessions().subscribe(function (sessions) {
                        console.log(JSON.stringify(sessions));
                        _this.sessions = sessions;
                        console.log(sessions[0].chosenCards);
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    this.currDate = new Date;
                };
                LoggedInHome.prototype.showReveal = function (i) {
                    var id = "#" + i;
                    var el = $(document).find($(id));
                    el.slideToggle("slow");
                };
                LoggedInHome.prototype.closeReveal = function (i) {
                    var id = "#" + i;
                    var el = $(document).find($(id));
                    el.slideToggle("slow");
                };
                /*
                 ------------------------- GENERAL ------------------------------------
                 */
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
                    __metadata('design:paramtypes', [sessionService_1.SessionService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, themeService_1.ThemeService])
                ], LoggedInHome);
                return LoggedInHome;
                var _a;
            })();
            exports_1("LoggedInHome", LoggedInHome);
        }
    }
});
//# sourceMappingURL=loggedInHome.component.js.map