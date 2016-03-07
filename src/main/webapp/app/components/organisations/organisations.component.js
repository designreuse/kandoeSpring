System.register(['angular2/core', "angular2/router", "../../security/TokenHelper", "../../service/organisationService", "../../service/userService", "../../DOM/users/user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, TokenHelper_1, organisationService_1, userService_1, user_1;
    var OrganisationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            OrganisationsComponent = (function () {
                function OrganisationsComponent(_organisationService, _userService, _router) {
                    this._organisationService = _organisationService;
                    this._userService = _userService;
                    this._router = _router;
                    this.organisations = [];
                    this.user = user_1.User.createEmpty();
                    this.userService = _userService;
                }
                OrganisationsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._organisationService.getUserOrganisations().subscribe(function (organisations) { return _this.organisations = organisations; });
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
                OrganisationsComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                OrganisationsComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this._router.navigate(['/Home']);
                };
                OrganisationsComponent.prototype.sortName = function () {
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
                OrganisationsComponent.prototype.sortId = function () {
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
                OrganisationsComponent.prototype.sortDesc = function () {
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
                OrganisationsComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'organisations',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/organisations/organisations.html',
                        inputs: ['organisations']
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], OrganisationsComponent);
                return OrganisationsComponent;
                var _a;
            })();
            exports_1("OrganisationsComponent", OrganisationsComponent);
        }
    }
});
//# sourceMappingURL=organisations.component.js.map