System.register(['angular2/core', "../../../security/TokenHelper", "../../../service/subThemeService", "../../../DOM/subTheme", "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TokenHelper_1, subThemeService_1, subTheme_1, router_1;
    var SubThemeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SubThemeComponent = (function () {
                function SubThemeComponent(subThemeService, router) {
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.file = null;
                    this.subThemeService = subThemeService;
                    this.router = router;
                }
                SubThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'subThemes',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/themes/subThemes/subTheme.html',
                    }), 
                    __metadata('design:paramtypes', [subThemeService_1.SubThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], SubThemeComponent);
                return SubThemeComponent;
                var _a;
            })();
            exports_1("SubThemeComponent", SubThemeComponent);
        }
    }
});
//# sourceMappingURL=subTheme.component.js.map