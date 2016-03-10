System.register(['angular2/core', "../../DOM/circleSession/session", "../../service/sessionService", "angular2/router", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user", "../../service/themeService", "../../service/organisationService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, session_1, sessionService_1, router_1, TokenHelper_1, userService_1, user_1, themeService_1, organisationService_1;
    var AddSession;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (sessionService_1_1) {
                sessionService_1 = sessionService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            }],
        execute: function() {
            AddSession = (function () {
                function AddSession(sessionService, _userService, router, themeService, organisationService) {
                    this._userService = _userService;
                    this.session = session_1.Session.createEmpty();
                    this.user = user_1.User.createEmpty();
                    this.sessionService = sessionService;
                    this.router = router;
                    this._userService = _userService;
                    this.themeService = themeService;
                    this.organisationService = organisationService;
                    this.users = [];
                }
                AddSession.prototype.ngOnInit = function () {
                    var _this = this;
                    this.themeService.getUserThemes().subscribe(function (themes) {
                        _this.themes = themes;
                        _this.session.themeId = themes[0].themeId;
                        _this.currentTheme = themes[0];
                        _this.cards = _this.currentTheme.cards;
                        _this.users = _this.session.users;
                        _this.showUsersOrganisation();
                    });
                    this._userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                AddSession.prototype.selectTheme = function ($event) {
                    this.currentTheme = this.themes.find(function (theme) { return theme.themeName === $event.target.value; });
                    console.log("theme: " + this.currentTheme.themeId);
                    this.showUsersOrganisation();
                };
                AddSession.prototype.showUsersOrganisation = function () {
                    var _this = this;
                    console.log("showOrganisationUsers");
                    this.organisationService.getOrganisationOrganisers(this.currentTheme.organisation.organisationId).subscribe(function (users) {
                        _this.users = users;
                    });
                    this.organisationService.getOrganisationMembers(this.currentTheme.organisation.organisationId).subscribe(function (users) {
                        _this.users = users;
                    });
                    this.cards = this.currentTheme.cards;
                };
                AddSession.prototype.onSubmit = function () {
                    this.sessionService.createSession(this.session);
                };
                AddSession.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                AddSession.prototype.showFullDescription = function (i) {
                    var id = "#" + i;
                    var cardid = "#desc-" + i;
                    var arrowid = "#arrow-" + i;
                    var description = $(document).find($(id));
                    var carddescription = $(document).find($(cardid));
                    var arrow = $(document).find($(arrowid));
                    description.css("display", "inherit");
                    arrow.css("display", "inherit");
                    carddescription.css("display", "none");
                };
                AddSession.prototype.hideFullDescription = function (i) {
                    var id = "#" + i;
                    var cardid = "#desc-" + i;
                    var arrowid = "#arrow-" + i;
                    var description = $(document).find($(id));
                    var carddescription = $(document).find($(cardid));
                    var arrow = $(document).find($(arrowid));
                    description.css("display", "none");
                    arrow.css("display", "none");
                    carddescription.css("display", "");
                };
                AddSession.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                AddSession = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-session',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/sessions/addSession.html',
                    }), 
                    __metadata('design:paramtypes', [sessionService_1.SessionService, userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, themeService_1.ThemeService, organisationService_1.OrganisationService])
                ], AddSession);
                return AddSession;
                var _a;
            })();
            exports_1("AddSession", AddSession);
        }
    }
});
//# sourceMappingURL=addSession.js.map