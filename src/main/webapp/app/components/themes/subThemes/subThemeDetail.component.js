System.register(["angular2/core", "angular2/router", "../../../service/themeService", "../../../security/TokenHelper", "../../../DOM/users/user", "../../../service/userService", "../../../DOM/card", "../../../service/cardService", "../../../DOM/subTheme", "../../../service/subThemeService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, TokenHelper_1, router_2, user_1, userService_1, card_1, cardService_1, subTheme_1, subThemeService_1;
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
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
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
            SubThemeDetailComponent = (function () {
                function SubThemeDetailComponent(router, userService, routeParams, cardService, subThemeService, themeService) {
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.subThemeCards = [];
                    this.user = user_1.User.createEmpty();
                    this.card = card_1.Card.createEmpty();
                    this.themeCards = [];
                    this.file = null;
                    this.csvFile = null;
                    this.userService = userService;
                    this.router = router;
                    this.subThemeId = +routeParams.params["id"];
                    this.cardService = cardService;
                    this.subThemeService = subThemeService;
                    this.themeService = themeService;
                }
                SubThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.subThemeService.getSubTheme(this.subThemeId).subscribe(function (subTheme) {
                        _this.subTheme = subTheme;
                        _this.themeId = _this.subTheme.themeId;
                        _this.themeService.getThemeCards(_this.themeId).subscribe(function (cards) {
                            console.log(cards);
                            _this.themeCards = cards;
                            console.log("themeCards have been added");
                        });
                    });
                    this.subThemeService.getSubThemeCards(this.subThemeId).subscribe(function (cards) {
                        _this.subThemeCards = cards;
                        console.log(cards.length);
                    });
                    this.userService.getCurrentUser().subscribe(function (data) { _this.user = data; }, function (error) { console.log(error); });
                };
                /*
                 ------------------------- GENERAL ------------------------------------
                 */
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
                SubThemeDetailComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                SubThemeDetailComponent.prototype.onCSVFileChange = function ($event) {
                    this.csvFile = $event.target.files[0];
                    var el = $event.target;
                    console.log(el);
                    $(el).closest(".btn-file").css({
                        color: "#333",
                        backgroundColor: "#e6e6e6",
                        borderColor: "#adadad"
                    });
                };
                SubThemeDetailComponent.prototype.onSubmitCSV = function () {
                    var _this = this;
                    if (!this.csvFile)
                        return;
                    console.log("File type: " + this.csvFile.type);
                    this.cardService.createCardFromCSV(this.subThemeId, this.csvFile).subscribe(function (data) {
                        for (var c in data.json()) {
                            console.log(c);
                            _this.subThemeCards.push(c);
                        }
                    }, function (error) {
                        console.log("Error uploading csv: " + error);
                    }, function () {
                        console.log("gefefeffv");
                    });
                };
                SubThemeDetailComponent.prototype.onSubmit = function () {
                    var _this = this;
                    console.log("adding card");
                    if (this.card.description) {
                        this.card.themeId = this.themeId;
                        this.card.subThemeId = this.subThemeId;
                        this.cardService.createCardForSubTheme(this.card, this.file).subscribe(function (c) {
                            _this.card.description = null;
                            _this.file = null;
                            _this.subThemeCards.push(c);
                        }, function (error) {
                            _this.file = null;
                            console.log(error);
                        });
                    }
                };
                SubThemeDetailComponent.prototype.selectCardsFromTheme = function () {
                    var _this = this;
                    var cardIds = [];
                    var i = 0;
                    $("input:checked").each(function () {
                        cardIds[i] = $(this).val();
                        i++;
                    });
                    for (var i = 0; i < cardIds.length; i++) {
                        this.cardService.getCardById(cardIds[i]).subscribe(function (card) {
                            card.subThemeId = _this.subThemeId;
                            console.log("incoming card subThemeId: " + card.subThemeId);
                            _this.cardService.createCardForSubTheme(card).subscribe(function (c) {
                                _this.subThemeCards.push(c);
                            });
                        });
                    }
                    console.log("number of selected cards: " + cardIds.length);
                };
                SubThemeDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'subThemes-details',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/subThemes/subThemeDetail.html',
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, userService_1.UserService, router_2.RouteParams, cardService_1.CardService, subThemeService_1.SubThemeService, themeService_1.ThemeService])
                ], SubThemeDetailComponent);
                return SubThemeDetailComponent;
            })();
            exports_1("SubThemeDetailComponent", SubThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=subThemeDetail.component.js.map