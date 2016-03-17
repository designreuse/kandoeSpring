System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user", "../../DOM/card", "../../DOM/subTheme", "../../service/cardService", "../../service/subThemeService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, TokenHelper_1, userService_1, user_1, card_1, subTheme_1, cardService_1, subThemeService_1;
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
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            }],
        execute: function() {
            ThemeComponent = (function () {
                function ThemeComponent(_themeService, router, _userService, cardService, routeParams, subThemeService) {
                    this._themeService = _themeService;
                    this._userService = _userService;
                    this.themes = [];
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.user = user_1.User.createEmpty();
                    this.file = null;
                    this.cards = [];
                    this.card = card_1.Card.createEmpty();
                    this.userService = _userService;
                    this.router = router;
                    this.themeId = +routeParams.params["id"];
                    this.cardService = cardService;
                    this.subThemeService = subThemeService;
                }
                ThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getUserThemes().subscribe(function (themes) {
                        _this.themes = themes;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                    for (var i = 0; i < this.themes.length; i++) {
                        this._themeService.getThemeSubThemes(this.themes[i].themeId).subscribe(function (subThemes) {
                            for (var j = 0; subThemes.length; j++) {
                                _this.themes[i].subThemes.push(subThemes[j]);
                            }
                        });
                    }
                    $("#input-search").on("keyup", function () {
                        var rex = new RegExp($(this).val(), "i");
                        $(".searchable-container .items").hide();
                        $(".searchable-container .items").filter(function () {
                            return rex.test($(this).text());
                        }).show();
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
                    else {
                        return "./app/resources/noimgplaceholder.png";
                    }
                };
                ThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeComponent.prototype.onFileChangeSubTheme = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("subthemeImg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeComponent.prototype.onAddCard = function (themeId) {
                    this.card.themeId = themeId;
                };
                ThemeComponent.prototype.onAddSubTheme = function (themeId) {
                    this.subTheme.subThemeId = themeId;
                };
                ThemeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.card.description) {
                        this.cardService.createCard(this.card, this.file).subscribe(function (card) {
                            _this.themes.find(function (th) { return th.themeId == card.themeId; }).cards.push(card);
                            _this.card.description = null;
                            _this.file = null;
                        }, function (error) {
                            //todo change error display
                            _this.file = null;
                            alert(error.text());
                        });
                    }
                };
                ThemeComponent.prototype.onSubmitSubTheme = function () {
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
                /*
                 --------------------------------------------------------------
                 --------------------- SORT FUNCTIONS -------------------------
                 --------------------------------------------------------------
                 */
                ThemeComponent.prototype.sortName = function () {
                    $(".filter-Name").addClass("active");
                    $(".filter-ID").removeClass("active");
                    $(".filter-Desc").removeClass("active");
                    var items = $("#sort-list li.items").get();
                    if ($(".filter-Name").hasClass("filter-A")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find("h2.title").text();
                            var keyB = $(b).find("h2.title").text();
                            if (keyA < keyB)
                                return -1;
                            if (keyA > keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-Name").removeClass("filter-A").addClass("filter-Z");
                        $(".filter-Name").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet").addClass("glyphicon-sort-by-alphabet-alt");
                    }
                    else if ($(".filter-Name").hasClass("filter-Z")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find("h2.title").text();
                            var keyB = $(b).find("h2.title").text();
                            if (keyA > keyB)
                                return -1;
                            if (keyA < keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-Name").removeClass("filter-Z").addClass("filter-A");
                        $(".filter-Name").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet-alt").addClass("glyphicon-sort-by-alphabet");
                    }
                };
                ThemeComponent.prototype.sortId = function () {
                    $(".filter-Name").removeClass("active");
                    $(".filter-ID").addClass("active");
                    $(".filter-Desc").removeClass("active");
                    var items = $("#sort-list li.items").get();
                    if ($(".filter-ID").hasClass("filter-A")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find(".id").text();
                            var keyB = $(b).find(".id").text();
                            if (keyA < keyB)
                                return -1;
                            if (keyA > keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-ID").removeClass("filter-A").addClass("filter-Z");
                        $(".filter-ID").find(".glyphicon").removeClass("glyphicon-sort-by-order").addClass("glyphicon-sort-by-order-alt");
                    }
                    else if ($(".filter-ID").hasClass("filter-Z")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find(".id").text();
                            var keyB = $(b).find(".id").text();
                            if (keyA > keyB)
                                return -1;
                            if (keyA < keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-ID").removeClass("filter-Z").addClass("filter-A");
                        $(".filter-ID").find(".glyphicon").removeClass("glyphicon-sort-by-order-alt").addClass("glyphicon-sort-by-order");
                    }
                };
                ThemeComponent.prototype.sortDesc = function () {
                    $(".filter-Name").removeClass("active");
                    $(".filter-ID").removeClass("active");
                    $(".filter-Desc").addClass("active");
                    var items = $("#sort-list li.items").get();
                    if ($(".filter-Desc").hasClass("filter-A")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find("p.desc").text();
                            var keyB = $(b).find("p.desc").text();
                            if (keyA < keyB)
                                return -1;
                            if (keyA > keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-Desc").removeClass("filter-A").addClass("filter-Z");
                        $(".filter-Desc").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet").addClass("glyphicon-sort-by-alphabet-alt");
                    }
                    else if ($(".filter-Desc").hasClass("filter-Z")) {
                        items.sort(function (a, b) {
                            var keyA = $(a).find("p.desc").text();
                            var keyB = $(b).find("p.desc").text();
                            if (keyA > keyB)
                                return -1;
                            if (keyA < keyB)
                                return 1;
                            return 0;
                        });
                        var ul = $("#sort-list");
                        $.each(items, function (i, li) {
                            ul.append(li);
                        });
                        $(".filter-Desc").removeClass("filter-Z").addClass("filter-A");
                        $(".filter-Desc").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet-alt").addClass("glyphicon-sort-by-alphabet");
                    }
                };
                ThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeComponent.html',
                        inputs: ['themes']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router, userService_1.UserService, cardService_1.CardService, router_1.RouteParams, subThemeService_1.SubThemeService])
                ], ThemeComponent);
                return ThemeComponent;
            })();
            exports_1("ThemeComponent", ThemeComponent);
        }
    }
});
//# sourceMappingURL=themeComponent.js.map