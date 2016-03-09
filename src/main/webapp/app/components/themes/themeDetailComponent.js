System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../DOM/theme", "../../DOM/organisation", "../../DOM/users/user", "../../service/userService", "../../DOM/card", "../../service/cardService"], function(exports_1) {
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
    var core_1, router_1, themeService_1, TokenHelper_1, theme_1, organisation_1, router_2, user_1, userService_1, card_1, cardService_1;
    var ThemeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            }],
        execute: function() {
            ThemeDetailComponent = (function () {
                function ThemeDetailComponent(_themeService, _router, userService, routeParams, cardService) {
                    this._themeService = _themeService;
                    this._router = _router;
                    this.theme = theme_1.Theme.createEmpty();
                    this.org = organisation_1.Organisation.createEmpty();
                    this.cards = [];
                    this.newCard = card_1.Card.createEmpty();
                    this.file = null;
                    this.newTag = "";
                    this.user = user_1.User.createEmpty();
                    this.userService = userService;
                    this.themeId = +routeParams.params["id"];
                    this.cardService = cardService;
                }
                ThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getTheme(this.themeId).subscribe(function (theme) {
                        _this.theme = theme;
                        _this.org = _this.theme.organisation;
                    });
                    this._themeService.getThemeCards(this.themeId).subscribe(function (cards) {
                        _this.cards = cards;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                ThemeDetailComponent.prototype.createCard = function () {
                    var _this = this;
                    this.newCard.themeId = this.themeId;
                    this.cardService.createCard(this.newCard, this.file).subscribe(function (c) {
                        _this.file = null;
                        _this.cards.push(c);
                    });
                };
                ThemeDetailComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                ThemeDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this._router.navigate(['/Home']);
                };
                ThemeDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                ThemeDetailComponent.prototype.addTag = function () {
                    if (this.newTag) {
                    }
                };
                ThemeDetailComponent.prototype.removeTag = function (event) {
                    var self = event.target;
                    $(self).closest(".tag").remove();
                };
                ThemeDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'Theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeDetailComponent.html',
                        inputs: ['theme']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, (typeof (_b = typeof router_2.RouteParams !== 'undefined' && router_2.RouteParams) === 'function' && _b) || Object, cardService_1.CardService])
                ], ThemeDetailComponent);
                return ThemeDetailComponent;
                var _a, _b;
            })();
            exports_1("ThemeDetailComponent", ThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=themeDetailComponent.js.map