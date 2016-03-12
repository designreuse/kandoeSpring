System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user", "../../DOM/card", "../../service/cardService"], function(exports_1) {
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
                };
                ThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                ThemeComponent.prototype.showPopup = function (id) {
                    this.themeId = id;
                    /* var background = document.getElementById('everything');
                     var popup=document.getElementById('popup-addCard');
             
                     $(popup).css('visibility', 'visible');
                     $(background).css('background','rgba(0, 0, 0, 0.7)')*/
                };
                ThemeComponent.prototype.closePopup = function () {
                    var popup = document.getElementById('popup-addCard');
                    $(popup).css('display', 'none');
                    this.router.navigate(['/Themes']);
                    document.location.reload();
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
                        selector: 'Theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeComponent.html',
                        inputs: ['themes']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, cardService_1.CardService])
                ], ThemeComponent);
                return ThemeComponent;
                var _a;
            })();
            exports_1("ThemeComponent", ThemeComponent);
        }
    }
});
//# sourceMappingURL=themeComponent.js.map