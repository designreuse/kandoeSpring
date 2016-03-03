System.register(['angular2/core', 'angular2/router', "../../security/TokenHelper", "../../service/themeService", "../../DOM/theme", "../../service/organisationService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                        template: "\n    <header>\n        <div class=\"container clearfix\">\n            <h3><span class=\"glyphicon glyphicon-plus-sign\"></span> Add Theme</h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <form  class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\">\n\n                <div class=\"form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" placeholder=\"Enter theme name\" class=\"form-control\" [(ngModel)]=\"theme.themeName\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Description</label>\n                    <input type=\"text\" placeholder=\"Enter Description\" class=\"form-control\" [(ngModel)]=\"theme.description\">\n                </div>\n                <div class=\"form-group\">\n                <label>Organisation</label>\n                    <select class=\"form-control\" (change)=\"selectOrganisation($event)\">\n                        <option class=\"form-control\" *ngFor=\"#organisation of currentOrganisations\" value=\"{{organisation.organisationName}}\">{{organisation.organisationName}}</option>\n                    </select>\n                </div>\n                <div class=\"row\">\n                    <button type=\"button\" class=\"btn btn-lg btn-wide btn-primary\" (click)=\"onSubmit()\">Add</button>\n                </div>\n        </form>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, router_1.Router, organisationService_1.OrganisationService])
                ], AddThemeComponent);
                return AddThemeComponent;
            })();
            exports_1("AddThemeComponent", AddThemeComponent);
        }
    }
});
//# sourceMappingURL=addThemeComponent.js.map