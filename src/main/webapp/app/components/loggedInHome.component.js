System.register(["angular2/core", "angular2/router", "../security/TokenHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                LoggedInHome.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                LoggedInHome = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'loggedin-home',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        template: "\n<div class=\"home col-md-12\">\n<nav class=\"navbar navbar-inverse \" role=\"navigation\">\n    <div class=\"container\">\n        <div class=\"navbar-header \">\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n                    data-target=\"#bs-example-navbar-collapse-1\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"./\">\n                KAN<span>DOE</span></a>\n        </div>\n    <section class=\"settings\">\n         <a [routerLink]=\"['/Organisations']\" class=\"glyphicon glyphicon-inbox large-screen\"> My Organisations</a>\n          <a [routerLink]=\"['/KandoeCard']\" class=\"glyphicon glyphicon-credit-card\"> Cards</a>\n\n         <a [routerLink]=\"['/Userprofile']\" class=\"glyphicon\">Edit profile</a>\n         <a class=\"glyphicon glyphicon-log-out\" (click)=\"logout()\">Logout</a>\n    </section>\n\n    </div>\n\n      <div>\n     <img class=\"img-responsivenav img-thumbnailnav\" id=\"profile-picturenav\" align=\"right\" src=\"https://zblogged.com/wp-content/uploads/2015/11/c1.png\">\n    </div>\n    </nav>\n    </div>\n    <div class=\"row col-md-offset-2\">\n         <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n        <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n        <div class=\"col-md-4\">\n            <div class=\"card\">\n            </div>\n        </div>\n\n    </div>\n\n <div class=\"footer\">\n    <footer class=\"footer-container\">\n\n        <p class=\"copy\">\u00A9 2016 Kandoe Inc.</p>\n\n    </footer>\n      </div>   "
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