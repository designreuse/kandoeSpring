System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user", "../../DOM/card", "../../service/cardService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, TokenHelper_1, userService_1, user_1, card_1, cardService_1;
    var ThemeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
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
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            }],
        execute: function() {
            ThemeComponent = (function () {
                function ThemeComponent(_themeService, router, _userService, cardService) {
                    this._themeService = _themeService;
                    this.router = router;
                    this._userService = _userService;
                    this.themes = [];
                    this.user = user_1.User.createEmpty();
                    this.file = null;
                    this.cards = [];
                    this.card = card_1.Card.createEmpty();
                    this.userService = _userService;
                    this.router = router;
                    this.cardService = cardService;
                }
                ThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getUserThemes().subscribe(function (themes) {
                        _this.themes = themes;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                ThemeComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                ThemeComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                ThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeComponent.prototype.rotateCard = function ($event) {
                    var card = $event.target;
                    var container = $(card).closest('.themeCard-container');
                    console.log(container);
                    if (container.hasClass('hover')) {
                        container.removeClass('hover');
                    }
                    else {
                        container.addClass('hover');
                    }
                };
                ThemeComponent.prototype.giveId = function (id) {
                    this.themeId = id;
                };
                ThemeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.card.themeId = +this.themeId;
                    this.cardService.createCard(this.card, this.file).subscribe(function (res) {
                        var popup = document.getElementById("popup-addCard");
                        $(popup).css("visibility", "hidden");
                        _this.router.navigate(['/Themes']);
                        document.location.reload();
                        _this.file = null;
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert(error.text());
                    });
                };
                ThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'Theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeComponent.html',
                        inputs: ['themes']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router, userService_1.UserService, cardService_1.CardService])
                ], ThemeComponent);
                return ThemeComponent;
            })();
            exports_1("ThemeComponent", ThemeComponent);
        }
    }
});
//# sourceMappingURL=themeComponent.js.map