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
    var core_1, router_1, themeService_1, router_2, TokenHelper_1, theme_1, organisation_1;
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
                function ThemeDetailComponent(_themeService, _router) {
                    this._themeService = _themeService;
                    this._router = _router;
                    this.theme = theme_1.Theme.createEmpty();
                    this.org = organisation_1.Organisation.createEmpty;
                }
                ThemeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getTheme(1).subscribe(function (theme) {
                        _this.theme = theme;
                        _this.org = _this.theme.organisation;
                        console.log(_this.theme);
                    });
                };
                ThemeDetailComponent = __decorate([
                    router_2.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'Theme',
                        template: "\n        <div class=\"container\">\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t\t    <div class=\"event-list col-1-4\">\n\t\t\t\t\t    <div class=\"id\"><p>{{theme.themeId}}</p></div>\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<h2 class=\"title\">{{theme.themeName}}</h2>\n\t\t\t\t\t\t\t<p class=\"desc\">{{theme.description}}</p>\n\t\t\t\t\t\t\t<p> IconURL: {{theme.iconURL}}</p>\n\t\t\t\t\t\t\t<p>Organisation name: {{org.organisationName}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t    </div>\n\t\t\t</div>\n\t\t</div>\n    </div>\n    ",
                        inputs: ['theme']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], ThemeDetailComponent);
                return ThemeDetailComponent;
                var _a;
            })();
            exports_1("ThemeDetailComponent", ThemeDetailComponent);
        }
    }
});
//# sourceMappingURL=themeDetailComponent.js.map