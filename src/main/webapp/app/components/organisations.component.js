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
                        template: "\n    <p>test</p>\n    <div class=\"panel-body\">\n            <div *ngFor=\"#organisation of organisations\" class=\"col-1-4\">\n                  <p>OrganisationID : {{organisation.organisationId}}</p>\n            </div>\n    </div>",
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