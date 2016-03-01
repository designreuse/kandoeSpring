System.register(["angular2/core", "angular2/router", "../../service/themeService", "../../security/TokenHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, themeService_1, router_2, TokenHelper_1;
    var ThemeComponent;
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
            }],
        execute: function() {
            ThemeComponent = (function () {
                function ThemeComponent(_themeService, _router) {
                    this._themeService = _themeService;
                    this._router = _router;
                    this.themes = [];
                }
                ThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._themeService.getAllThemes().subscribe(function (themes) { return _this.themes = themes; });
                    console.log(this.themes.length);
                };
                ThemeComponent = __decorate([
                    router_2.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'Theme',
                        template: "\n        <div class=\"container\">\n        <div class=\"input-append\">\n            <input class=\"span2 search-query\" id=\"input-search\" type=\"search\" placeholder=\"Search organisations...\" >\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" id =\"filter\" data-toggle=\"dropdown\">\n                <span class=\"glyphicon glyphicon-filter\"></span>\n                <span class=\"caret\"></span>Filter</button>\n                <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\">Name</a></li>\n                    <li><a href=\"#\">Description</a></li>\n                </ul>\n            </div>\n        </div>\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-2 col-sm-8\">\n\t\t\t\t<ul class=\"searchable-container\">\n\t\t\t\t    <div *ngFor=\"#theme of themes\" class=\"event-list col-1-4\">\n\t\t\t\t\t<li class=\"items\">\n\t\t\t\t\t    <div class=\"id\"><p>{{theme.themeId}}</p></div>\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<h2 class=\"title\">{{theme.themeName}}</h2>\n\t\t\t\t\t\t\t<p class=\"desc\">{{theme.description}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"social\">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n\t\t\t\t\t\t\t\t<li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n\t\t\t\t\t\t\t\t<li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n    </div>\n    ",
                        inputs: ['themes']
                    }), 
                    __metadata('design:paramtypes', [themeService_1.ThemeService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], ThemeComponent);
                return ThemeComponent;
                var _a;
            })();
            exports_1("ThemeComponent", ThemeComponent);
        }
    }
});
//# sourceMappingURL=themeComponent.js.map