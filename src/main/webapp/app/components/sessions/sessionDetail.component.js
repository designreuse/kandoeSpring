System.register(['angular2/core', "../../security/TokenHelper", "angular2/router", "../../service/sessionService", "../../service/userService", "../../DOM/users/user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TokenHelper_1, router_1, sessionService_1, userService_1, user_1;
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
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            SessionDetailComponent = (function () {
                function SessionDetailComponent(sesService, _userService, router, routeParams) {
                    this._userService = _userService;
                    this.size = [];
                    this.user = user_1.User.createEmpty();
                    this.sessionService = sesService;
                    this.router = router;
                    this.sessionId = +routeParams.params["id"];
                    this.userService = _userService;
                }
                SessionDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sessionService.getSessionById(this.sessionId).subscribe(function (s) {
                        console.log(JSON.stringify(s));
                        _this.session = s;
                        var j = s.size;
                        for (var i = 0; i < s.size; i++) {
                            _this.size[i] = j - 1;
                            j = j - 1;
                        }
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                SessionDetailComponent.prototype.calculateWidthCentre = function () {
                    var width = document.getElementById("circlesvg").clientWidth;
                    return width / 2;
                };
                SessionDetailComponent.prototype.calculateHeightCentre = function () {
                    var height = document.getElementById("circlesvg").clientHeight;
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
                SessionDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'session-detail',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        template: "\n    <nav class=\"navbar navbar-inverse navbar-fixed-top \" role=\"navigation\">\n        <div class=\"container\">\n            <div class=\"navbar-header \">\n                <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"dropdown-toggle\"\n                        data-target=\"#bs-example-navbar-collapse-1\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"./\">\n                    KAN<span>DOE</span></a>\n            </div>\n            <ul class=\"nav navbar-nav navwidth\">\n                <li><a [routerLink]=\"['/LoggedInHome']\">   KANDOES   </a></li>\n                <li > <a [routerLink]=\"['/Organisations']\">  ORGANISATIONS   </a> </li>\n                <li class=\"active\"> <a href=\"#\">    THEMES   </a> </li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li><img class=\"img-responsivenav img-thumbnailnav\" id=\"profile-picturenav\"  [src]=\"getImageSrc(user.profilePicture)\">\n                </li>\n                <li class=\"dropdown\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">{{user.person.firstname}} <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\">\n                        <li> <a class=\"glyphicon\" [routerLink]=\"['/Userprofile']\">Edit profile</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li> <a class=\"glyphicon glyphicon-log-out\"  (click)=\"logout()\"> Logout</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n    </nav>\n    <header>\n        <div class=\"container clearfix\">\n            <h3>THEME</h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <ol class=\"breadcrumb\">\n            <li><a [routerLink]=\"['/LoggedInHome']\"> Kandoes</a></li>\n            <li><a [routerLink]=\"['/Themes']\">Themes</a></li>\n            <li class=\"active\"> Add theme</li>\n        </ol>\n        <div class=\"row\">\n\n        </div>\n        <div class=\"row\">\n            <div class=\"center-container\">\n                <svg id=\"circlesvg\" width=\"100%\" height=\"100%\">\n                    <circle *ngFor=\"#siz of size\" [attr.cx]=\"calculateWidthCentre()\" [attr.cy]=\"calculateHeightCentre()\" [attr.r]=\"60 + (60*siz)\" stroke=\"#fff\" stroke-width=\"8\" fill=\"#1E8BC3\"/>\n                </svg>\n            </div>\n        </div>\n    </div>\n    "
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