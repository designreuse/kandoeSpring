System.register(['angular2/core', "../../DOM/circleSession/session", "../../service/sessionService", "angular2/router", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user", "../../service/themeService", "../../service/organisationService", "../../service/subThemeService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, session_1, sessionService_1, router_1, TokenHelper_1, userService_1, user_1, themeService_1, organisationService_1, subThemeService_1;
    var DateTimeFormat, AddSession;
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
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            }],
        execute: function() {
            AddSession = (function () {
                function AddSession(sessionService, _userService, router, themeService, organisationService, subThemeService) {
                    this._userService = _userService;
                    this.session = session_1.Session.createEmpty();
                    this.subThemes = [];
                    this.user = user_1.User.createEmpty();
                    this.types = ['PROBLEM', 'IDEA'];
                    this.modes = ['ASYNC', 'SYNC'];
                    this.sessionService = sessionService;
                    this.router = router;
                    this._userService = _userService;
                    this.themeService = themeService;
                    this.organisationService = organisationService;
                    this.subThemeService = subThemeService;
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
                        _this.session.theme = _this.currentTheme;
                        _this.showUsersOrganisation();
                    });
                    this.subThemeService.getUserSubThemes().subscribe(function (subThemes) {
                        _this.subThemes = subThemes;
                        _this.session.subTheme.subThemeId = subThemes[0].subThemeId;
                        _this.currentSubTheme = subThemes[0];
                        _this.cards = _this.currentSubTheme.cards;
                        _this.users = _this.session.users;
                        _this.session.subTheme = _this.currentSubTheme;
                    });
                    this._userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    this.types = ['PROBLEM', 'IDEA'];
                    this.modes = ['ASYNC', 'SYNC'];
                };
                AddSession.prototype.onDateChanged = function (event) {
                    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
                };
                AddSession.prototype.selectTheme = function ($event) {
                    this.currentTheme = this.themes.find(function (theme) { return theme.themeName === $event.target.value; });
                    this.session.theme = this.currentTheme;
                    this.session.themeId = this.currentTheme.themeId;
                    this.showUsersOrganisation();
                };
                AddSession.prototype.selectSubTheme = function ($event) {
                    this.currentSubTheme = this.subThemes.find(function (st) { return st.subThemeName === $event.target.value; });
                    this.session.subTheme = this.currentSubTheme;
                    this.session.themeId = this.currentSubTheme.subThemeId;
                    this.showUsersOrganisationSubTheme();
                };
                AddSession.prototype.showUsersOrganisation = function () {
                    var _this = this;
                    this.users = [];
                    console.log("showOrganisationUsers");
                    this.organisationService.getOrganisationOrganisers(this.currentTheme.organisation.organisationId).subscribe(function (users) {
                        users.forEach(function (u) {
                            console.log(JSON.stringify(u));
                            _this.users.push(u);
                        });
                    });
                    this.organisationService.getOrganisationMembers(this.currentTheme.organisation.organisationId).subscribe(function (users) {
                        users.forEach(function (u) {
                            console.log(JSON.stringify(u));
                            _this.users.push(u);
                        });
                    });
                    this.cards = this.currentTheme.cards;
                };
                AddSession.prototype.showUsersOrganisationSubTheme = function () {
                    var _this = this;
                    this.users = [];
                    console.log("showOrganisationUsers");
                    this.organisationService.getOrganisationOrganisers(this.currentSubTheme.organisation.organisationId).subscribe(function (users) {
                        users.forEach(function (u) {
                            console.log(JSON.stringify(u));
                            _this.users.push(u);
                        });
                    });
                    this.organisationService.getOrganisationMembers(this.currentSubTheme.organisation.organisationId).subscribe(function (users) {
                        users.forEach(function (u) {
                            console.log(JSON.stringify(u));
                            _this.users.push(u);
                        });
                    });
                    this.cards = this.currentSubTheme.cards;
                };
                AddSession.prototype.selectMode = function ($event) {
                    this.session.type = $event.target.value;
                };
                AddSession.prototype.selectType = function ($event) {
                    this.session.mode = $event.target.value;
                };
                AddSession.prototype.onSubmit = function () {
                    var _this = this;
                    this.startDate = new Date(this.startYear + "-" + this.startMonth + "-" + this.startDay);
                    this.endDate = new Date(this.endYear + "-" + this.endMonth + "-" + this.endDay);
                    this.session.startTime = this.startDate.toISOString();
                    this.session.endTime = this.endDate.toISOString();
                    console.log(JSON.stringify(this.session));
                    this.sessionService.createSession(this.session).subscribe(function (res) {
                        _this.router.navigate(['/LoggedInHome']);
                    }, function (error) {
                        alert("Something went wrong");
                    });
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
                    __metadata('design:paramtypes', [sessionService_1.SessionService, userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, themeService_1.ThemeService, organisationService_1.OrganisationService, subThemeService_1.SubThemeService])
                ], AddSession);
                return AddSession;
                var _a;
            })();
            exports_1("AddSession", AddSession);
        }
    }
});
//# sourceMappingURL=addSession.js.map