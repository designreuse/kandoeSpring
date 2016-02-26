System.register(['angular2/core', 'angular2/router', "../service/service"], function(exports_1) {
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
    var core_1, router_1, service_1;
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
                    this._service.getAllOrganisations().subscribe(function (organisations) { return _this.organisations = organisations; });
                    console.log(this.organisations.length);
                };
                OrganisationsComponent = __decorate([
                    core_1.Component({
                        selector: 'organisations',
                        template: "\n    <div class=\"panel-body container\">\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t\t<ul>\n\t\t\t\t    <div *ngFor=\"#organisation of organisations\" class=\"event-list col-1-4\">\n                    <!--<p>OrganisationID : {{organisation.organisationId}}</p>-->\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<img alt=\"KdG\" [src]=\"organisation.logoUrl\" />\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<h2 class=\"title\">{{organisation.organisationId}} {{organisation.organisationName}}</h2>\n\t\t\t\t\t\t\t<p class=\"desc\">{{organisation.address}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"social\">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n\t\t\t\t\t\t\t\t<li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n\t\t\t\t\t\t\t\t<li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n    </div>",
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