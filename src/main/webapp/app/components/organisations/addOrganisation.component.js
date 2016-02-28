System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1;
    var AddOrganisationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddOrganisationComponent = (function () {
                function AddOrganisationComponent(orgService, router) {
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.file = null;
                    this.organisationService = orgService;
                    this.router = router;
                }
                AddOrganisationComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddOrganisationComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.organisationService.createOrganisation(this.organisation, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Organisations']);
                    }, function (error) {
                        //todo change error display
                        alert(error.text());
                    });
                };
                AddOrganisationComponent = __decorate([
                    core_1.Component({
                        selector: 'add-organisation',
                        template: "\n        <form  class=\"col-lg-offset-3 col-lg-6\" method=\"post\" role=\"form\">\n            <div class=\"form-pad\">\n                <h3>Add new organisation</h3>\n                <div class=\"form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" placeholder=\"Enter organisation name\" class=\"form-control\" [(ngModel)]=\"organisation.organisationName\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Address</label>\n                    <input type=\"text\" placeholder=\"Enter address\" class=\"form-control\" [(ngModel)]=\"organisation.address\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Logo</label>\n                    <input type=\"file\" multiple=\"false\" (change)=\"onFileChange($event)\">\n                </div>\n                <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Add</button>\n            </div>\n        </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, router_1.Router])
                ], AddOrganisationComponent);
                return AddOrganisationComponent;
            })();
            exports_1("AddOrganisationComponent", AddOrganisationComponent);
        }
    }
});
//# sourceMappingURL=addOrganisation.component.js.map