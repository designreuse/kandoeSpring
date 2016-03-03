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
    var core_1, router_1, themeService_1, TokenHelper_1, theme_1, organisation_1;
    var ThemeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                        template: "\n    <header>\n        <div class=\"container clearfix\">\n            <h3><span class=\"glyphicon glyphicon-bookmark\">  {{theme.themeName}}</span></h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <div class=\"center-container col-lg-offset-2 col-lg-8\">\n            <img class=\"img-responsive img-thumbnail\" id=\"org-logo\" [src]=\"getImageSrc(theme.iconURL)\">\n        </div>\n        <div class=\"row\">\n            <div class=\"center-container col-lg-offset-2 col-lg-8\">\n                <h3>{{theme.description}}</h3>\n            </div>\n        </div>\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t<ol class=\"breadcrumb\">\n        <li><a [routerLink]=\"['/LoggedInHome']\">Your Kandoe</a></li>\n        <li><a [routerLink]=\"['/Themes']\">Themes</a></li>\n        <li class=\"active\"> Theme detail</li>\n    </ol>\n\n\t\t\t<h4>Organisation</h4>\n\t\t\t    <ul class=\"organisation-list\">\n                    <li>\n                        <a [routerLink]=\"['/OrganisationDetail', {id:org.organisationId}]\">\n                        <div class=\"item\">\n                            <div class=\"id\"><p>{{org.organisationId}}</p></div>\n                            <img alt=\"logo\" [src]=\"getImageSrc(org.logoUrl, org.organisationId)\" />\n                            <div class=\"info\">\n                                <h2 class=\"title\">{{org.organisationName}}</h2>\n                                <p class=\"desc\">{{org.address}}</p>\n                            </div>\n                            </div>\n                        </a>\n                    </li>\n               </ul>\n\t\t\t</div>\n\t\t</div>\n    </div>\n    ",
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