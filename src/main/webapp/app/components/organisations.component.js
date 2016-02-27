System.register(['angular2/core', 'angular2/router', "../service/service", "../security/TokenHelper"], function(exports_1) {
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
    var core_1, router_1, service_1, TokenHelper_1;
    var OrganisationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            }],
        execute: function() {
            OrganisationsComponent = (function () {
                function OrganisationsComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.organisations = [];
                }
                OrganisationsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._service.getUserOrganisations().subscribe(function (organisations) { return _this.organisations = organisations; });
                    console.log(this.organisations.length);
                    $('#input-search').on('keyup', function () {
                        var rex = new RegExp($(this).val(), 'i');
                        $('.searchable-container .items').hide();
                        $('.searchable-container .items').filter(function () {
                            return rex.test($(this).text());
                        }).show();
                    });
                };
                OrganisationsComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'organisations',
                        template: "\n\n    <div class=\"container\">\n        <div class=\"input-append\">\n            <input class=\"span2 search-query\" id=\"input-search\" type=\"search\" placeholder=\"Search organisations...\" >\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" id =\"filter\" data-toggle=\"dropdown\">\n                <span class=\"glyphicon glyphicon-filter\"></span>\n                <span class=\"caret\"></span>Filter</button>\n                <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\">Name</a></li>\n                    <li><a href=\"#\">Id</a></li>\n                    <li><a href=\"#\">Address</a></li>\n                </ul>\n            </div>\n        </div>\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t\t<ul class=\"searchable-container\">\n\t\t\t\t    <div *ngFor=\"#organisation of organisations; #i = index\" class=\"event-list col-1-4\">\n                        <!--<p>OrganisationID : {{organisation.organisationId}}</p>-->\n                        <li class=\"items\">\n                            <div class=\"id\"><p>{{i+1}}</p></div>\n                            <img alt=\"logo\" [src]=\"organisation.logoUrl\" />\n                            <div class=\"info\">\n                                <h2 class=\"title\">{{organisation.organisationName}}</h2>\n                                <p class=\"desc\">{{organisation.address}}</p>\n                            </div>\n                            <div class=\"social\">\n                                <ul>\n                                    <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                    <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                    <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                </ul>\n                            </div>\n                        </li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n    </div>",
                        inputs: ['organisations']
                    }), 
                    __metadata('design:paramtypes', [service_1.Service, router_1.Router])
                ], OrganisationsComponent);
                return OrganisationsComponent;
            })();
            exports_1("OrganisationsComponent", OrganisationsComponent);
        }
    }
});
//# sourceMappingURL=organisations.component.js.map