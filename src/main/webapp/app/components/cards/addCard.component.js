System.register(["../../security/TokenHelper", 'angular2/core', "angular2/router", "../../DOM/card", "../../service/cardService", "../../service/userService", "../../service/themeService", "../../DOM/users/user", "../../DOM/theme"], function(exports_1) {
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
    var TokenHelper_1, core_1, router_1, card_1, cardService_1, userService_1, themeService_1, user_1, theme_1;
    var AddCardComponent;
    return {
        setters:[
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            }],
        execute: function() {
            AddCardComponent = (function () {
                function AddCardComponent(cardService, router, userService, themeService, routeParams) {
                    this.card = card_1.Card.createEmpty();
                    this.file = null;
                    this.user = user_1.User.createEmpty();
                    this.theme = theme_1.Theme.createEmpty();
                    this.cardService = cardService;
                    this.router = router;
                    this.userService = userService;
                    this.themeService = themeService;
                    this.themeId = +routeParams.params["id"];
                }
                AddCardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    this.themeService.getTheme(this.themeId).subscribe(function (theme) {
                        _this.theme = theme;
                    });
                };
                AddCardComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                AddCardComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                AddCardComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.card.themeId = this.themeId;
                    this.cardService.createCard(this.card, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Themes']);
                        _this.file = null;
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert(error.text());
                    });
                };
                AddCardComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                AddCardComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-card',
                        templateUrl: 'app/components/cards/AddCard.html'
                    }), 
                    __metadata('design:paramtypes', [cardService_1.CardService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, themeService_1.ThemeService, (typeof (_b = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _b) || Object])
                ], AddCardComponent);
                return AddCardComponent;
                var _a, _b;
            })();
            exports_1("AddCardComponent", AddCardComponent);
        }
    }
});
//# sourceMappingURL=addCard.component.js.map