System.register(['angular2/core', "angular2/router", "../../security/TokenHelper", "../../service/organisationService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, TokenHelper_1, organisationService_1;
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
            }],
        execute: function() {
            OrganisationsComponent = (function () {
                function OrganisationsComponent(_organisationService, _router) {
                    this._organisationService = _organisationService;
                    this._router = _router;
                    this.organisations = [];
                }
                OrganisationsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._organisationService.getUserOrganisations().subscribe(function (organisations) { return _this.organisations = organisations; });
                    $("#input-search").on("keyup", function () {
                        var rex = new RegExp($(this).val(), "i");
                        $(".searchable-container .items").hide();
                        $(".searchable-container .items").filter(function () {
                            return rex.test($(this).text());
                        }).show();
                    });
                };
                OrganisationsComponent.prototype.getImageSrc = function (url, id) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
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
                        template: "\n    <header>\n        <div class=\"container clearfix\" id=\"org-header\">\n            <h3>Organisations</h3>\n            <div class=\"col-xs-12 col-sm-offset-3 col-sm-6\">\n                <form class=\"form-search\">\n                    <div class=\"input-group\">\n                        <input id=\"input-search\" class=\"form-control border-radius\"  placeholder=\"Search organisations...\" >\n                        <div class=\"input-group-btn\">\n                            <button type=\"button\" class=\"btn btn-default filter filter-ID filter-A\" (click)=\"sortId()\">\n                            <span class=\"glyphicon glyphicon-sort-by-order\"> ID</span></button>\n                            <button type=\"button\" class=\"btn btn-default filter filter-Name filter-A\" (click)=\"sortName()\">\n                            <span class=\"glyphicon glyphicon-sort-by-alphabet\"> Name</span></button>\n                            <button type=\"button\" class=\"btn btn-default filter filter-Desc filter-A\" (click)=\"sortDesc()\">\n                            <span class=\"glyphicon glyphicon-sort-by-alphabet\"> Description</span></button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </header>\n    <div class=\"container main\" id=\"org-list\">\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-1 col-sm-10\">\n\t\t\t\t<ul class=\"searchable-container\">\n\t\t\t\t<div class=\"organisation-list col-1-4\">\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t    <a [routerLink]=\"['/AddOrganisation']\" >\n                                <div class=\"id\"><p>0</p></div>\n                                <span class=\"add glyphicon glyphicon-plus-sign\"></span>\n                                <div class=\"info\">\n                                    <h2 class=\"title\">Add an organisation</h2>\n                                    <p class=\"desc\">Create your own group, add people and themes, and link a session. Make sure you're in control!</p>\n                                </div>\n                                <div class=\"social\">\n                                    <ul>\n                                        <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                        <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                        <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                    </ul>\n                                </div>\n                            </a>\n                        </li>\n\n\t\t\t\t    <div *ngFor=\"#organisation of organisations; #i = index\" id=\"sort-list\">\n\n                        <li class=\"items\">\n                        <a [routerLink]=\"['/OrganisationDetail', {id:organisation.organisationId}]\">\n                            <div class=\"id\"><p>{{i+1}}</p></div>\n                            <img alt=\"logo\" [src]=\"getImageSrc(organisation.logoUrl, organisations.organisationId)\" />\n                            <div class=\"info\">\n                                <h2 class=\"title\">{{organisation.organisationName}}</h2>\n                                <p class=\"desc\">{{organisation.address}}</p>\n                            </div>\n                            <div class=\"social\">\n                                <ul>\n                                    <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                    <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                    <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                </ul>\n                            </div>\n                            </a>\n                        </li>\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\n\t\t\t</div>\n\t\t</div>\n\n    </div>",
                        inputs: ['organisations']
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, router_1.Router])
                ], OrganisationsComponent);
                return OrganisationsComponent;
            })();
            exports_1("OrganisationsComponent", OrganisationsComponent);
        }
    }
});
//# sourceMappingURL=organisations.component.js.map