System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", "angular2/router", "../../security/TokenHelper", "../../service/userService", "../../DOM/users/user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1, TokenHelper_1, userService_1, user_1;
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
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            AddOrganisationComponent = (function () {
                function AddOrganisationComponent(orgService, _userService, router) {
                    this._userService = _userService;
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.file = null;
                    this.user = user_1.User.createEmpty();
                    this.organisationService = orgService;
                    this.router = router;
                    this._userService = _userService;
                }
                AddOrganisationComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                AddOrganisationComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                AddOrganisationComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("imgOut");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                AddOrganisationComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.organisationService.createOrganisation(this.organisation, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Organisations']);
                        _this.file = null;
                    }, function (error) {
                        _this.file = null;
                        console.log(error);
                    });
                };
                AddOrganisationComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                    else {
                        return "./app/resources/noimgplaceholder.png";
                    }
                };
                AddOrganisationComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-organisation',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/organisations/addOrganisation.html'
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, userService_1.UserService, router_1.Router])
                ], AddOrganisationComponent);
                return AddOrganisationComponent;
            })();
            exports_1("AddOrganisationComponent", AddOrganisationComponent);
        }
    }
});
//# sourceMappingURL=addOrganisation.component.js.map