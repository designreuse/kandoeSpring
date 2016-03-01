System.register(['angular2/core', 'angular2/router', "../../security/TokenHelper", "../../service/themeService", "../../DOM/theme", "../../service/organisationService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, TokenHelper_1, themeService_1, theme_1, organisationService_1;
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
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            }],
        execute: function() {
            AddThemeComponent = (function () {
                function AddThemeComponent(themeService, router, orgService) {
                    this.theme = theme_1.Theme.createEmpty();
                    this.file = null;
                    this.themeService = themeService;
                    this.router = router;
                    this.organisationService = orgService;
                }
                AddThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.organisationService.getAllOrganisations().subscribe(function (orgs) { return _this.currentOrganisations = orgs; });
                };
                AddThemeComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddThemeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.themeService.createTheme(this.theme).subscribe(function (res) {
                        console.log(res.text());
                        _this.router.navigate(['/Themes']);
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert("something went wrong");
                    });
                };
                AddThemeComponent.prototype.selectOrganisation = function ($event) {
                    //alert($event.srcElement.value);
                    var organisation = this.currentOrganisations.find(function (org) { return org.organisationName === $event.srcElement.value; });
                    this.theme.organisation = organisation;
                    console.log(organisation);
                };
                AddThemeComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-theme',
                        template: "\n        <form  class=\"col-lg-offset-3 col-lg-6\" method=\"post\" role=\"form\">\n            <div class=\"form-pad\">\n                <h3>Add new theme</h3>\n                <div class=\"form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" placeholder=\"Enter theme name\" class=\"form-control\" [(ngModel)]=\"theme.themeName\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Description</label>\n                    <input type=\"text\" placeholder=\"Enter Description\" class=\"form-control\" [(ngModel)]=\"theme.description\">\n                </div>\n                <div class=\"form-group\">\n                    <select (change)=\"selectOrganisation($event)\">\n                        <option *ngFor=\"#organisation of currentOrganisations\" value=\"{{organisation.organisationName}}\">{{organisation.organisationName}}</option>\n                    </select>\n                </div>\n                <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Add</button>\n            </div>\n        </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, organisationService_1.OrganisationService])
                ], AddThemeComponent);
                return AddThemeComponent;
                var _a;
            })();
            exports_1("AddThemeComponent", AddThemeComponent);
        }
    }
});
//# sourceMappingURL=addThemeComponent.js.map