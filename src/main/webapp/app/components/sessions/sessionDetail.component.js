System.register(['angular2/core', "../../security/TokenHelper", "angular2/router", "../../service/sessionService", "../../DOM/circleSession/session", "../../service/userService", "../../DOM/users/user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TokenHelper_1, router_1, sessionService_1, session_1, userService_1, user_1;
    var SessionDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sessionService_1_1) {
                sessionService_1 = sessionService_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            SessionDetailComponent = (function () {
                function SessionDetailComponent(sesService, userService, router, routeParams) {
                    this.session = session_1.Session.createEmpty();
                    this.size = [];
                    this.cards = [];
                    this.users = [];
                    this.user = user_1.User.createEmpty();
                    this.sessionService = sesService;
                    this.router = router;
                    this.sessionId = +routeParams.params["id"];
                    this.userService = userService;
                }
                SessionDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sessionService.getSessionById(this.sessionId).subscribe(function (s) {
                        _this.session = s;
                        var j = s.size;
                        for (var i = 0; i < s.size; i++) {
                            _this.size[i] = --j;
                        }
                        _this.cards = s.cards;
                        _this.users = s.users;
                    }, function (e) {
                        _this.router.navigate(["/LoggedInHome"]);
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                SessionDetailComponent.prototype.calculateWidthCentre = function () {
                    var width = document.getElementById("circlesvg").getBoundingClientRect().width;
                    return width / 2;
                };
                SessionDetailComponent.prototype.calculateHeightCentre = function () {
                    var height = document.getElementById("circlesvg").getBoundingClientRect().height;
                    return height / 2;
                };
                SessionDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                SessionDetailComponent.prototype.showFullDescription = function (i) {
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
                SessionDetailComponent.prototype.hideFullDescription = function (i) {
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
                SessionDetailComponent.prototype.onSelectCard = function ($event) {
                    this.countChecked();
                };
                SessionDetailComponent.prototype.countChecked = function () {
                    var count = $("input:checked").length;
                    if (count >= this.session.maxCards) {
                        $("input:checkbox:not(:checked)").prop('disabled', true);
                    }
                    else {
                        $("input:checkbox:not(:checked)").prop('disabled', false);
                    }
                };
                SessionDetailComponent.prototype.onChooseCards = function () {
                    var _this = this;
                    var count = $("input:checked").length;
                    if (count >= this.session.minCards) {
                        var cardIds = Array();
                        var i = 0;
                        $("input:checked").each(function () {
                            cardIds[i++] = $(this).val();
                            console.log($(this).val());
                        });
                        this.sessionService.addCards(cardIds, this.sessionId).subscribe(function (ses) {
                            _this.session = ses;
                            _this.cards = ses.cards;
                            _this.users = ses.users;
                            _this.session.chosenCards = true;
                        }, function (e) {
                            console.log(e.text());
                        });
                    }
                };
                SessionDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'session-detail',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/sessions/sessionDetail.html',
                    }), 
                    __metadata('design:paramtypes', [sessionService_1.SessionService, userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _b) || Object])
                ], SessionDetailComponent);
                return SessionDetailComponent;
                var _a, _b;
            })();
            exports_1("SessionDetailComponent", SessionDetailComponent);
        }
    }
});
//# sourceMappingURL=sessionDetail.component.js.map