System.register(['angular2/core', 'angular2/router', "../service/service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                    this._service.getOrganisations().subscribe(function (organisations) { return _this.organisations = organisations; });
                    console.log(this.organisations.length);
                };
                OrganisationsComponent = __decorate([
                    core_1.Component({
                        selector: 'organisations',
                        template: "\n    <p>test</p>\n    <div class=\"panel-body\">\n            <div *ngFor=\"#organisation of organisations\" class=\"col-1-4\">\n                  <p>OrganisationID : {{organisation.organisationId}}</p>\n            </div>\n    </div>",
                        inputs: ['organisations']
                    }), 
                    __metadata('design:paramtypes', [service_1.Service, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], OrganisationsComponent);
                return OrganisationsComponent;
                var _a;
            })();
            exports_1("OrganisationsComponent", OrganisationsComponent);
        }
    }
});
//# sourceMappingURL=organisations.component.js.map