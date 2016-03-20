System.register(["angular2/core", "angular2/router", "../../../security/TokenHelper", "../../../DOM/users/user", "../../../service/userService", "../../../service/cardService", "../../../DOM/subTheme", "../../../service/subThemeService"], function(exports_1) {
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
    var core_1, router_1, TokenHelper_1, router_2, user_1, userService_1, cardService_1, subTheme_1, subThemeService_1;
    var SubThemeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
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
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            }],
        execute: function() {
            SubThemeDetailComponent = (function () {
                function SubThemeDetailComponent(router, userService, routeParams, cardService, subThemeService) {
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.subThemeCards = [];
                    this.user = user_1.User.createEmpty();
                    this.userService = userService;
                    this.router = router;
                    this.subThemeId = +routeParams.params["id"];
                    this.cardService = cardService;
                    this.subThemeService = subThemeService;
                }
                SubThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.subThemeService.getSubTheme(this.subThemeId).subscribe(function (subTheme) {
                        _this.subTheme = subTheme;
                        _this.themeId = _this.subTheme.themeId;
                    });
                    this.subThemeService.getSubThemeCards(this.subThemeId).subscribe(function (cards) {
                        _this.subThemeCards = cards;
                        console.log(cards.length);
                    });
                    this.userService.getCurrentUser().subscribe(function (data) { _this.user = data; }, function (error) { console.log(error); });
                };
                SubThemeDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                SubThemeDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                    else {
                        return "./app/resources/noimgplaceholder.png";
                    }
                };
                SubThemeDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'subThemes-details',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/subThemes/subThemeDetail.html',
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, (typeof (_b = typeof router_2.RouteParams !== 'undefined' && router_2.RouteParams) === 'function' && _b) || Object, cardService_1.CardService, subThemeService_1.SubThemeService])
                ], SubThemeDetailComponent);
                return SubThemeDetailComponent;
                var _a, _b;
            })();
            exports_1("SubThemeDetailComponent", SubThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=subThemeDetail.component.js.map