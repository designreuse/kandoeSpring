System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", "angular2/router", "../../security/TokenHelper", "../../DOM/users/user", "../../service/userService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1, TokenHelper_1, user_1, userService_1;
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
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            }],
        execute: function() {
            OrganisationDetailComponent = (function () {
                function OrganisationDetailComponent(orgService, routeParams, userService, router) {
                    this.router = router;
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.organisers = [];
                    this.members = [];
                    this.themes = [];
                    this.newMember = "";
                    this.newOrganiser = "";
                    this.user = user_1.User.createEmpty();
                    this.organisationService = orgService;
                    this.orgId = +routeParams.params["id"];
                    this.userService = userService;
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
                    this.organisationService.getOrganisationThemes(this.orgId).subscribe(function (themes) {
                        _this.themes = themes;
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                OrganisationDetailComponent.prototype.showAddUser = function () {
                    event.preventDefault();
                    var self = event.target;
                    $(self).toggleClass('hide-add');
                    if ($(self).hasClass('hide-add')) {
                        $('.add-user').closest('.row').slideUp(100);
                    }
                    else {
                        $('.add-user').closest('.row').slideDown(100);
                    }
                };
                OrganisationDetailComponent.prototype.showAddOrg = function () {
                    event.preventDefault();
                    var self = event.target;
                    $(self).toggleClass('hide-add');
                    if ($(self).hasClass('hide-add')) {
                        $('.add-org').closest('.row').slideUp(100);
                    }
                    else {
                        $('.add-org').closest('.row').slideDown(100);
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
                OrganisationDetailComponent.prototype.addOrganiser = function () {
                    var _this = this;
                    if (this.newOrganiser) {
                        this.organisationService.addOrganiserToOrganisation(this.orgId, this.newOrganiser).subscribe(function (u) {
                            _this.organisers.push(u);
                            if (_this.members.find(function (user) { return user.username === u.username; })) {
                                var index = _this.members.indexOf(u);
                                _this.members.splice(index, 1);
                            }
                            _this.newOrganiser = "";
                        });
                    }
                };
                OrganisationDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
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
                OrganisationDetailComponent.prototype.rotateCard = function () {
                    var card = $('.btn-simple').closest('.themeCard-container');
                    console.log(card);
                    if (card.hasClass('hover')) {
                        card.removeClass('hover');
                    }
                    else {
                        card.addClass('hover');
                    }
                };
                OrganisationDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: "organisation-detail",
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/organisations/organisationDetail.html'
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, router_1.RouteParams, userService_1.UserService, router_1.Router])
                ], OrganisationDetailComponent);
                return OrganisationDetailComponent;
            })();
            exports_1("OrganisationDetailComponent", OrganisationDetailComponent);
        }
    }
});
//# sourceMappingURL=organisationDetail.component.js.map