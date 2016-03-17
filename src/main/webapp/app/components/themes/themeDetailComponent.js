System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../DOM/theme", "../../DOM/organisation", "../../DOM/users/user", "../../service/userService", "../../DOM/card", "../../service/cardService", "../../DOM/subTheme", "../../service/subThemeService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, TokenHelper_1, theme_1, organisation_1, router_2, user_1, userService_1, card_1, cardService_1, subTheme_1, subThemeService_1;
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
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            }],
        execute: function() {
            ThemeDetailComponent = (function () {
                function ThemeDetailComponent(_themeService, router, userService, routeParams, cardService, subThemeService) {
                    this._themeService = _themeService;
                    this.theme = theme_1.Theme.createEmpty();
                    this.org = organisation_1.Organisation.createEmpty();
                    this.cards = [];
                    this.subThemes = [];
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.themes = [];
                    this.card = card_1.Card.createEmpty();
                    this.file = null;
                    this.user = user_1.User.createEmpty();
                    this.userService = userService;
                    this.router = router;
                    this.themeId = +routeParams.params["id"];
                    this.cardService = cardService;
                    this.subThemeService = subThemeService;
                }
                ThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getTheme(this.themeId).subscribe(function (theme) {
                        _this.theme = theme;
                        _this.org = _this.theme.organisation;
                    });
                    this._themeService.getUserThemes(this.themeId).subscribe(function (themes) {
                        _this.themes = themes;
                    });
                    this._themeService.getThemeCards(this.themeId).subscribe(function (cards) {
                        _this.cards = cards;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    this._themeService.getThemeSubThemes(this.themeId).subscribe(function (subThemes) {
                        _this.subThemes = subThemes;
                    });
                };
                ThemeDetailComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.card.description) {
                        this.card.themeId = +this.themeId;
                        this.cardService.createCard(this.card, this.file).subscribe(function (res) {
                            _this.router.navigate("['/Themes',{id:theme.themeId}]");
                            document.location.reload();
                            _this.themes.find(function (th) { return th.themeId == res.themeId; }).cards.push(res);
                            _this.card.description = null;
                            _this.file = null;
                        }, function (error) {
                            //todo change error display
                            _this.file = null;
                            alert(error.text());
                        });
                    }
                };
                ThemeDetailComponent.prototype.onSubmitSubTheme = function () {
                    var _this = this;
                    if (this.subTheme.description) {
                        this.subThemeService.createSubTheme(this.subTheme, this.file).subscribe(function (st) {
                            _this.router.navigate("['/Themes',{id:theme.themeId}]");
                            document.location.reload();
                            _this.themes.find(function (th) { return th.themeId == st.themeId; }).subThemes.push(st);
                            _this.subTheme.description = null;
                            _this.file = null;
                        }, function (error) {
                            //todo change error display
                            _this.file = null;
                            alert(error.text());
                        });
                    }
                };
                ThemeDetailComponent.prototype.createCard = function () {
                    var _this = this;
                    this.card.themeId = this.themeId;
                    this.cardService.createCard(this.card, this.file).subscribe(function (c) {
                        _this.file = null;
                        _this.cards.push(c);
                    });
                };
                ThemeDetailComponent.prototype.onAddCard = function (themeId) {
                    this.card.themeId = themeId;
                };
                ThemeDetailComponent.prototype.onAddSubTheme = function (themeId) {
                    this.subTheme.subThemeId = themeId;
                };
                ThemeDetailComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
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
                    else {
                        return "./app/resources/noimgplaceholder.png";
                    }
                };
                ThemeDetailComponent.prototype.onFileChangeSubTheme = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("subthemeImg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'theme-detail',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeDetailComponent.html',
                        inputs: ['theme']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, (typeof (_b = typeof router_2.RouteParams !== 'undefined' && router_2.RouteParams) === 'function' && _b) || Object, cardService_1.CardService, subThemeService_1.SubThemeService])
                ], ThemeDetailComponent);
                return ThemeDetailComponent;
                var _a, _b;
            })();
            exports_1("ThemeDetailComponent", ThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=themeDetailComponent.js.map