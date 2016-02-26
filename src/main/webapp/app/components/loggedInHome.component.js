System.register(["angular2/core", "angular2/router", "../security/TokenHelper"], function(exports_1) {
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
    var core_1, router_1, TokenHelper_1;
    var LoggedInHome;
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
            }],
        execute: function() {
            LoggedInHome = (function () {
                function LoggedInHome(router) {
                    this.router = null;
                    this.router = router;
                }
                LoggedInHome = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'loggedin-home',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        template: "\n<div class=\"home col-md-10\">\n    <section class=\"settings\">\n         <a [routerLink]=\"['/Organisations']\" class=\"glyphicon glyphicon-inbox large-screen\"> My Organisations</a>\n    </section>\n    <div class=\"row col-md-offset-2\">\n         <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n        <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n        <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n    </div>\n </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], LoggedInHome);
                return LoggedInHome;
            })();
            exports_1("LoggedInHome", LoggedInHome);
        }
    }
});
//# sourceMappingURL=loggedInHome.component.js.map