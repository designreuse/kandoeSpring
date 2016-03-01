System.register(['angular2/core', 'angular2/router', "../../security/TokenHelper", "../../service/themeService", "../../DOM/theme"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, TokenHelper_1, themeService_1, theme_1;
    var AddThemeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            }],
        execute: function() {
            AddThemeComponent = (function () {
                function AddThemeComponent(themeService, router) {
                    this.theme = theme_1.Theme.createEmpty();
                    this.file = null;
                    this.themeService = themeService;
                    this.router = router;
                }
                AddThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddThemeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.themeService.createTheme(this.theme).subscribe(function (res) {
                        _this.router.navigate(['/Themes']);
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert("something went wrong");
                    });
                };
                AddThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-theme',
                        template: "\n        <form  class=\"col-lg-offset-3 col-lg-6\" method=\"post\" role=\"form\">\n            <div class=\"form-pad\">\n                <h3>Add new theme</h3>\n                <div class=\"form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" placeholder=\"Enter theme name\" class=\"form-control\" [(ngModel)]=\"theme.themeName\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Description</label>\n                    <input type=\"text\" placeholder=\"Enter Description\" class=\"form-control\" [(ngModel)]=\"theme.description\">\n                </div>\n                <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Add</button>\n            </div>\n        </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router])
                ], AddThemeComponent);
                return AddThemeComponent;
            })();
            exports_1("AddThemeComponent", AddThemeComponent);
        }
    }
});
//# sourceMappingURL=addThemeComponent.js.map