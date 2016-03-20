System.register(['angular2/core', "../../security/TokenHelper", "../../service/themeService", "../../DOM/theme", "../../service/organisationService", "angular2/router", "../../service/userService", "../../DOM/users/user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TokenHelper_1, themeService_1, theme_1, organisationService_1, router_1, userService_1, user_1;
    var AddThemeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            AddThemeComponent = (function () {
                function AddThemeComponent(themeService, router, orgService, userService) {
                    this.theme = theme_1.Theme.createEmpty();
                    this.file = null;
                    this.user = user_1.User.createEmpty();
                    this.themeService = themeService;
                    this.router = router;
                    this.organisationService = orgService;
                    this.userService = userService;
                }
                AddThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.organisationService.getUserOrganisations().subscribe(function (orgs) {
                        _this.currentOrganisations = orgs;
                        _this.theme.organisation = orgs[0];
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                AddThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddThemeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.themeService.createTheme(this.theme, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Themes']);
                    }, function (error) {
                        _this.file = null;
                        console.log("something went wrong");
                    });
                };
                AddThemeComponent.prototype.selectOrganisation = function ($event) {
                    var organisation = this.currentOrganisations.find(function (org) { return org.organisationName === $event.target.value; });
                    this.theme.organisation = organisation;
                };
                /*
                 --------------------------------- GENERAL ---------------------------
                 */
                AddThemeComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                AddThemeComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                AddThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/addTheme.html',
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router, organisationService_1.OrganisationService, userService_1.UserService])
                ], AddThemeComponent);
                return AddThemeComponent;
            })();
            exports_1("AddThemeComponent", AddThemeComponent);
        }
    }
});
//# sourceMappingURL=addThemeComponent.js.map