System.register(["angular2/core", "./register.component", "angular2/router"], function(exports_1) {
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
    var core_1, register_component_1, router_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(router) {
                    this.router = router;
                }
                Home.prototype.login = function () {
                    var login = document.getElementById("login-form");
                    var register = document.getElementById("register-form");
                    login.style.display = "block";
                    register.style.display = "none";
                };
                Home.prototype.register = function () {
                    var login = document.getElementById("login-form");
                    var register = document.getElementById("register-form");
                    login.style.display = "none";
                    register.style.display = "block";
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        directives: [register_component_1.RegisterComponent],
                        template: "\n<div class=\"home\">\n    <h1 class=\"jumbotron\">Welcome to Kandoe</h1>\n\n    <div class=\"background-img\">\n    <h2 class=\"col-md-12 intro\">Free platform for making decisions <br>\n        Easy to use<br>\n        You can participate with a lot of people</h2>\n\n        <div class=\"container well\">\n            <div class=\"row\">\n                <div class=\"panel panel-login\">\n                    <div class=\"panel-heading\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-12 intro\">\n                                <button type=\"button\" class=\"btn-info btn-sm col-lg-offset-3 col-lg-2\" (click)=\"login()\">Log in</button>\n                                <button type=\"button\" class=\"btn-info btn-sm col-lg-offset-1 col-lg-2\" (click)=\"register()\">Register</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            \t<div class=\"col-lg-12\">\n                                    <form id=\"login-form\" class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\" style=\"display: block;\">\n                                        <div class=\"form-group\">\n                                            <label>Username</label>\n                                            <input type=\"text\" name=\"username\" class=\"form-control\" />\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <label>Password</label>\n                                            <input type=\"password\" name=\"password\" class=\"form-control\"/>\n                                        </div>\n                                        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"submit()\">Submit</button>\n                                    </form>\n                                    <register id=\"register-form\" style=\"display: none\"></register>\n                                </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        "
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