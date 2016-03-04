System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper", "../../DOM/theme", "../../DOM/organisation"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, TokenHelper_1, theme_1, organisation_1, router_2;
    var ThemeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            }],
        execute: function() {
            ThemeDetailComponent = (function () {
                function ThemeDetailComponent(_themeService, _router, routeParams) {
                    this._themeService = _themeService;
                    this._router = _router;
                    this.theme = theme_1.Theme.createEmpty();
                    this.org = organisation_1.Organisation.createEmpty;
                    this.themeId = +routeParams.params["id"];
                }
                ThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getTheme(this.themeId).subscribe(function (theme) {
                        _this.theme = theme;
                        _this.org = _this.theme.organisation;
                    });
                };
                ThemeDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                ThemeDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'Theme',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/themeDetailComponent.html',
                        inputs: ['theme']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router, router_2.RouteParams])
                ], ThemeDetailComponent);
                return ThemeDetailComponent;
            })();
            exports_1("ThemeDetailComponent", ThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=themeDetailComponent.js.map