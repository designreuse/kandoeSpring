var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Arne on 16/02/2016.
 */
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var LoggedInHome = (function () {
    function LoggedInHome(router) {
        this.router = null;
        this.router = router;
    }
    LoggedInHome = __decorate([
        core_1.Component({
            selector: 'loggedin-home',
            directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
            template: "\n        <div class=\"home\">\n            <section class=\"settings\">\n                    <a [routerLink]=\"['/Organisations']\" class=\"glyphicon glyphicon-inbox large-screen\"> My Organisations</a>\n            </section>\n        </div>\n        "
        })
    ], LoggedInHome);
    return LoggedInHome;
})();
exports.LoggedInHome = LoggedInHome;
//# sourceMappingURL=loggedInHome.component.js.map