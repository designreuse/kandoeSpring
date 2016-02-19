var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by michaelkees on 12/02/16.
 */
var core_1 = require('angular2/core');
var OrganisationsComponent = (function () {
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
        })
    ], OrganisationsComponent);
    return OrganisationsComponent;
})();
exports.OrganisationsComponent = OrganisationsComponent;
//# sourceMappingURL=organisations.component.js.map