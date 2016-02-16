System.register(["angular2/core", "angular2/router"], function(exports_1) {
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
    var core_1, router_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(router) {
                    this.router = null;
                    this.loginFormVisible = false;
                    this.registerFormVisible = false;
                    this.router = router;
                }
                Home.prototype.login = function () {
                    this.loginFormVisible = !this.loginFormVisible;
                };
                Home.prototype.register = function () {
                    this.registerFormVisible = !this.registerFormVisible;
                };
                Home.prototype.onRegister = function () {
                    this.router.navigate(['/Register']);
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        template: "\n\n<div class=\"home\">\n    <h1 class=\"jumbotron\">Welcome to Kandoe</h1>\n    <div class=\"background-img\">\n    <h2 class=\"col-md-12 intro\">Free platform for making decisions <br>\n        Easy to use<br>\n        You can participate with a lot of people</h2>\n\n        <div *ngIf=\"loginFormVisible == false\">\n            <button class=\"col-md-3 col-md-offset-2\" (click)=\"login()\">Log in</button>\n        </div>\n        <div *ngIf=\"loginFormVisible == true\">\n            <form method=\"post\">\n                <input type=\"text\" name=\"username\" />\n                <input type=\"password\" name=\"password\"/>\n                <input type=\"submit\" name=\"login\" value=\"submit\"/>\n            </form>\n        </div>\n        <div *ngIf=\"registerFormVisible == false\">\n            <button class=\"col-md-3 col-md-offset-1\" (click)=\"register()\">Register</button>\n        </div>\n        <div *ngIf=\"registerFormVisible == true\">\n             <form method=\"post\" action=\"/login\">\n                <input type=\"text\" name=\"username\" />\n                <input type=\"password\" name=\"password\"/>\n                <input type=\"submit\" name=\"login\" value=\"submit\" (click)=\"onRegister()\"/>\n            </form>\n        </div>\n    </div>\n</div>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map