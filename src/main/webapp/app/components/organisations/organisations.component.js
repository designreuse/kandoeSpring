System.register(['angular2/core', 'angular2/router', "../../security/TokenHelper", "../../service/organisationService"], function(exports_1) {
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
                    console.log(this.organisations.length);
                    $('#input-search').on('keyup', function () {
                        var rex = new RegExp($(this).val(), 'i');
                        $('.searchable-container .items').hide();
                        $('.searchable-container .items').filter(function () {
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
                    return url;
                };
                OrganisationsComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'organisations',
                        template: "\n\n    <div class=\"container\">\n        <div class=\"input-append\">\n            <input class=\"span2 search-query\" id=\"input-search\" type=\"search\" placeholder=\"Search organisations...\" >\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" id =\"filter\" data-toggle=\"dropdown\">\n                <span class=\"glyphicon glyphicon-filter\"></span>\n                <span class=\"caret\"></span>Filter</button>\n                <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\">Name</a></li>\n                    <li><a href=\"#\">Id</a></li>\n                    <li><a href=\"#\">Address</a></li>\n                </ul>\n            </div>\n        </div>\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t\t<ul class=\"searchable-container\">\n\t\t\t\t    <div *ngFor=\"#organisation of organisations; #i = index\" class=\"event-list col-1-4\">\n                        <!--<p>OrganisationID : {{organisation.organisationId}}</p>-->\n                        <li class=\"items\">\n                            <div class=\"id\"><p>{{i+1}}</p></div>\n                            <img alt=\"logo\" [src]=\"getImageSrc(organisation.logoUrl, organisations.organisationId)\" />\n                            <div class=\"info\">\n                                <h2 class=\"title\">{{organisation.organisationName}}</h2>\n                                <p class=\"desc\">{{organisation.address}}</p>\n                            </div>\n                            <div class=\"social\">\n                                <ul>\n                                    <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                    <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                    <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                </ul>\n                            </div>\n                        </li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n    </div>",
                        inputs: ['organisations']
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], OrganisationsComponent);
                return OrganisationsComponent;
                var _a;
            })();
            exports_1("OrganisationsComponent", OrganisationsComponent);
        }
    }
});
//# sourceMappingURL=organisations.component.js.map