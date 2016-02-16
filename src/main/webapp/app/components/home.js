System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home() {
                    this.loginFormVisible = false;
                    this.registerFormVisible = false;
                }
                Home.prototype.login = function () {
                    if (this.loginFormVisible) {
                        this.loginFormVisible = false;
                    }
                    else {
                        this.loginFormVisible = true;
                    }
                };
                Home.prototype.register = function () {
                    if (this.registerFormVisible) {
                        this.registerFormVisible = false;
                    }
                    else {
                        this.registerFormVisible = true;
                    }
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        template: "\n\n<div class=\"home\">\n    <h1 class=\"jumbotron\">Welcome to Kandoe</h1>\n    <div class=\"background-img\">\n    <h2 class=\"col-md-12 intro\">Free platform for making decisions <br>\n        Easy to use<br>\n        You can participate with a lot of people</h2>\n\n        <div *ngIf=\"loginFormVisible == false\">\n            <button class=\"col-md-3 col-md-offset-2\" (click)=\"login()\">Log in</button>\n        </div>\n        <div *ngIf=\"loginFormVisible == true\">\n            <form method=\"post\">\n                <input type=\"text\" name=\"username\" />\n                <input type=\"password\" name=\"password\"/>\n                <input type=\"submit\" name=\"login\" value=\"submit\"/>\n            </form>\n        </div>\n        <div *ngIf=\"registerFormVisible == false\">\n            <button class=\"col-md-3 col-md-offset-1\" (click)=\"register()\">Register</button>\n        </div>\n        <div *ngIf=\"registerFormVisible == true\">\n             <form method=\"post\" action=\"/login\">\n                <input type=\"text\" name=\"username\" />\n                <input type=\"password\" name=\"password\"/>\n                <input type=\"submit\" name=\"login\" value=\"submit\"/>\n            </form>\n        </div>\n    </div>\n</div>\n        "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map