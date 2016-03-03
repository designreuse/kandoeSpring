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
                    this.newMember = "";
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
                OrganisationDetailComponent.prototype.showAddUser = function () {
                    $("#add-button").toggleClass('hide-add');
                    if ($(this).hasClass('hide-add')) {
                        $('.add-user').closest('.row').css("display", "none");
                    }
                    else {
                        $('.add-user').closest('.row').slideDown(100);
                    }
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
                    if (this.newMember) {
                        this.organisationService.addMemberToOrganisation(this.orgId, this.newMember).subscribe(function (u) {
                            _this.members.push(u);
                            _this.newMember = "";
                        });
                    }
                };
                OrganisationDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: "organisation-detail",
                        template: "\n    <header>\n        <div class=\"container clearfix\">\n            <h3><span class=\"glyphicon glyphicon-book\"> {{organisation.organisationName}}</span></h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <div class=\"center-container col-lg-offset-2 col-lg-8\">\n            <img class=\"img-responsive img-thumbnail\" id=\"org-logo\" [src]=\"getImageSrc(organisation.logoUrl)\">\n        </div>\n        <div class=\"row\">\n            <div class=\"center-container col-lg-offset-2 col-lg-8\">\n                <h3>{{organisation.address}}</h3>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-offset-2 col-lg-8\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading c-list\">\n                        <h4 class=\"title\">Organisers</h4>\n                    </div>\n                    <ul class=\"panel-body list-group org-list\">\n                        <div *ngFor=\"#organiser of organisers\">\n                          <li class=\"list-group-item\">\n                            <div class=\"col-xs-12 col-sm-3\">\n                                <img src=\"http://zblogged.com/wp-content/uploads/2015/11/c1.png\" alt=\"profile picture\" class=\"img-responsive img-circle\" />\n                            </div>\n                            <div class=\"col-xs-12 col-sm-9\">\n                                <span class=\"username\">{{ organiser.username }}</span>\n                                <span class=\"pull-right email\">{{organiser.email}}</span> <br/>\n                                <span class=\"name\">{{organiser.person.firstname}} {{organiser.person.lastname}}</span>\n                            </div>\n                            <div class=\"clearfix\"></div>\n                          </li>\n                        </div>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-offset-2 col-lg-8\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading c-list\">\n                        <h4 class=\"title\">Members</h4>\n                        <div class=\"pull-right c-controls\" *ngIf=\"organisation.organiser\">\n                            <a class=\"hide-add\" id=\"add-button\" (click)=\"showAddUser()\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n                        </div>\n                    </div>\n                    <div class=\"row\" style=\"display: none\">\n                        <div class=\"col-xs-12\">\n                            <div class=\"input-group add-user\">\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newMember\">\n                                <span class=\"input-group-btn\">\n                                    <button class=\"btn btn-default\" type=\"button\" (click)=\"addMember()\"><i class=\"glyphicon glyphicon-plus-sign\"></i> Add user</button>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                    <ul class=\"panel-body list-group member-list\">\n                        <div *ngFor=\"#member of members\">\n                          <li class=\"list-group-item\">\n                            <div class=\"col-xs-12 col-sm-3\">\n                                <img src=\"https://zblogged.com/wp-content/uploads/2015/11/c1.png\" alt=\"profile picture\" class=\"img-responsive img-circle\" />\n                            </div>\n                            <div class=\"col-xs-12 col-sm-9\">\n                                <span class=\"username\">{{ member.username }}</span>\n                                <span class=\"pull-right email\">{{member.email}}</span><br/>\n                                <span class=\"name\">{{member.person.firstname}} {{member.person.lastname}}</span>\n                            </div>\n                          </li>\n                        </div>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    "
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