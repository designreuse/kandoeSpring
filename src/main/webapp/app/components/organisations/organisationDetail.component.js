System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", 'angular2/router', "../../security/TokenHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1, TokenHelper_1;
    var OrganisationDetailComponent;
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
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            }],
        execute: function() {
            OrganisationDetailComponent = (function () {
                function OrganisationDetailComponent(orgService, routeParams) {
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.organisers = [];
                    this.members = [];
                    this.organisationService = orgService;
                    this.orgId = +routeParams.params["id"];
                }
                OrganisationDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.organisationService.getOrganisationById(this.orgId).subscribe(function (org) {
                        _this.organisation = org;
                        _this.organisation.logoUrl = org.logoUrl;
                    });
                    this.organisationService.getOrganisationOrganisers(this.orgId).subscribe(function (users) {
                        _this.organisers = users;
                    });
                    this.organisationService.getOrganisationMembers(this.orgId).subscribe(function (users) {
                        _this.members = users;
                    });
                };
                OrganisationDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                OrganisationDetailComponent.prototype.addMember = function () {
                    var _this = this;
                    this.organisationService.addMemberToOrganisation(this.orgId, this.newMember).subscribe(function (u) {
                        _this.members.push(u);
                        console.log("member added");
                    });
                };
                OrganisationDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: "organisation-detail",
                        template: "\n        <p>{{organisation.organisationName}}</p>\n        <p>{{organisation.address}}</p>\n        <img [src]=\"getImageSrc(organisation.logoUrl)\">\n        <p>organisers</p>\n        <ul>\n          <li *ngFor=\"#organiser of organisers\">\n            {{ organiser.username }}\n          </li>\n        </ul>\n        <p>members</p>\n        <ul>\n          <li *ngFor=\"#member of members\">\n            {{ member.username }}\n          </li>\n        </ul>\n        <div *ngIf=\"organisation.organiser\">\n            <input type=\"text\" [(ngModel)]=\"newMember\">\n            <button type=\"button\" (click)=\"addMember()\">Add member</button>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, router_1.RouteParams])
                ], OrganisationDetailComponent);
                return OrganisationDetailComponent;
            })();
            exports_1("OrganisationDetailComponent", OrganisationDetailComponent);
        }
    }
});
//# sourceMappingURL=organisationDetail.component.js.map