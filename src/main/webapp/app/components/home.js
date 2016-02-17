System.register(["angular2/core", "angular2/router", "../DOM/users/user", "../service/userService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_1, userService_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(userService, router) {
                    this.user = user_1.User.createEmpty();
                    this.userService = null;
                    this.userService = userService;
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
                Home.prototype.onRegister = function () {
                    this.router.navigate(['/Register']);
                };
                Home.prototype.ngOnInit = function () {
                };
                Home.prototype.onSubmit = function () {
                    if (this.user.password != this.user.passwordConfirm) {
                        //do something
                        console.log("passwords not matching");
                    }
                    else {
                        this.userService.createUser(this.user).subscribe(function (u) {
                            console.log(JSON.stringify(u));
                            //todo navigate to page
                            //this.router.navigate(['/Organisations']);
                        });
                    }
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        template: "\n\n<div class=\"home\">\n    <h1 class=\"jumbotron\">Welcome to Kandoe</h1>\n\n    <div class=\"background-img\">\n    <h2 class=\"col-md-12 intro\">Free platform for making decisions <br>\n        Easy to use<br>\n        You can participate with a lot of people</h2>\n\n        <div class=\"container well\">\n            <div class=\"row\">\n                <div class=\"panel panel-login\">\n                    <div class=\"panel-heading\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-12 intro\">\n                                <button type=\"button\" class=\"btn-info btn-sm col-lg-offset-3 col-lg-2\" (click)=\"login()\">Log in</button>\n                                <button type=\"button\" class=\"btn-info btn-sm col-lg-offset-1 col-lg-2\" (click)=\"register()\">Register</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            \t<div class=\"col-lg-12\">\n                                    <form id=\"login-form\" class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\" style=\"display: block;\">\n                                        <div class=\"form-group\">\n                                            <label>Username</label>\n                                            <input type=\"text\" name=\"username\" class=\"form-control\" />\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <label>Password</label>\n                                            <input type=\"password\" name=\"password\" class=\"form-control\"/>\n                                        </div>\n                                        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"submit()\">Submit</button>\n                                    </form>\n                                    <form id=\"register-form\" class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\" style=\"display: none;\">\n                                            <div class=\"form-group\">\n                                                <label>Username</label>\n                                                <input type=\"text\" placeholder=\"Enter username\" class=\"form-control\" [(ngModel)]=\"user.username\">\n                                            </div>\n                                            <div class=\"form-group\">\n                                                <label>Password</label>\n                                                <input type=\"password\" placeholder=\"Enter password\" class=\"form-control\" [(ngModel)]=\"user.password\">\n                                            </div>\n                                            <div class=\"form-group\">\n                                               <!-- <label class=\"col-sm-2 control-label\" for=\"inputError\">\n                                                Input with error and icon</label>\n                                                <div class=\"col-sm-10\">\n                                                  <input type=\"text\" class=\"form-control\" id=\"inputError\">\n                                                  <span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>\n                                                </div> -->\n                                                <label>Password confirmation</label>\n                                                <input type=\"password\" placeholder=\"Enter password again\" class=\"form-control\" [(ngModel)]=\"user.passwordConfirm\">\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-sm-4 form-group\">\n                                                    <label>First Name</label>\n                                                    <input type=\"text\" placeholder=\"Enter first name\" class=\"form-control\" [(ngModel)]=\"user.person.firstname\">\n                                                </div>\n                                                <div class=\"col-sm-8 form-group\">\n                                                    <label>Last Name</label>\n                                                    <input type=\"text\" placeholder=\"Enter last name\" class=\"form-control\" [(ngModel)]=\"user.person.lastname\">\n                                                </div>\n                                            </div>\n                                            <div class=\"form-group\">\n                                                <label>Email Address</label>\n                                                <input type=\"text\" placeholder=\"Enter email address\" class=\"form-control\" [(ngModel)]=\"user.email\">\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-sm-8 form-group\">\n                                                    <label>Street</label>\n                                                    <input type=\"text\" placeholder=\"Enter street\" class=\"form-control\" [(ngModel)]=\"user.person.address.street\">\n                                                </div>\n                                                <div class=\"col-sm-4 form-group\">\n                                                    <label>Number</label>\n                                                    <input type=\"text\" placeholder=\"Enter streetnumber\" class=\"form-control\" [(ngModel)]=\"user.person.address.streetNumber\">\n                                                </div>\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-sm-8 form-group\">\n                                                    <label>City</label>\n                                                    <input type=\"text\" placeholder=\"Enter city name\" class=\"form-control\" [(ngModel)]=\"user.person.address.city\">\n                                                </div>\n                                                <div class=\"col-sm-4 form-group\">\n                                                    <label>Zip</label>\n                                                    <input type=\"text\" placeholder=\"Enter zip code\" class=\"form-control\" [(ngModel)]=\"user.person.address.zip\">\n                                                </div>\n                                            </div>\n                                        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Submit</button>\n                                    </form>\n                                </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        "
                    }), 
                    __metadata('design:paramtypes', [userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], Home);
                return Home;
                var _a;
            })();
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map