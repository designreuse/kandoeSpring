System.register(['angular2/core', 'angular2/router', "../DOM/users/user", "../service/userService"], function(exports_1) {
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
    var RegisterComponent;
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
            RegisterComponent = (function () {
                function RegisterComponent(userService, router) {
                    this.user = user_1.User.createEmpty();
                    this.userService = null;
                    this.userService = userService;
                    this.router = router;
                }
                RegisterComponent.prototype.ngOnInit = function () {
                };
                RegisterComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.user.password != this.user.passwordConfirm) {
                        //todo do something
                        console.log("passwords not matching");
                    }
                    else {
                        this.userService.createUser(this.user).subscribe(function (u) {
                            console.log(JSON.stringify(u));
                            //todo navigate to page
                            _this.router.navigate(['/LoggedInHome']);
                        });
                    }
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register',
                        template: "\n    <form  class=\"col-lg-offset-3 col-lg-6\" method=\"post\" role=\"form\">\n        <div class=\"form-pad\">\n        <h3>Register</h3>\n        <div class=\"form-group\">\n            <label>Username</label>\n            <input type=\"text\" placeholder=\"Enter username\" class=\"form-control\" [(ngModel)]=\"user.username\">\n        </div>\n        <div class=\"form-group\">\n            <label>Password</label>\n            <input type=\"password\" placeholder=\"Enter password\" class=\"form-control\" [(ngModel)]=\"user.password\">\n        </div>\n        <div class=\"form-group\">\n           <!-- <label class=\"col-sm-2 control-label\" for=\"inputError\">\n            Input with error and icon</label>\n            <div class=\"col-sm-10\">\n              <input type=\"text\" class=\"form-control\" id=\"inputError\">\n              <span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>\n            </div> -->\n            <label>Password confirmation</label>\n            <input type=\"password\" placeholder=\"Enter password again\" class=\"form-control\" [(ngModel)]=\"user.passwordConfirm\">\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-4 form-group\">\n                <label>First Name</label>\n                <input type=\"text\" placeholder=\"Enter first name\" class=\"form-control\" [(ngModel)]=\"user.person.firstname\">\n            </div>\n            <div class=\"col-sm-8 form-group\">\n                <label>Last Name</label>\n                <input type=\"text\" placeholder=\"Enter last name\" class=\"form-control\" [(ngModel)]=\"user.person.lastname\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label>Email Address</label>\n            <input type=\"text\" placeholder=\"Enter email address\" class=\"form-control\" [(ngModel)]=\"user.email\">\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-8 form-group\">\n                <label>Street</label>\n                <input type=\"text\" placeholder=\"Enter street\" class=\"form-control\" [(ngModel)]=\"user.person.address.street\">\n            </div>\n            <div class=\"col-sm-4 form-group\">\n                <label>Number</label>\n                <input type=\"text\" placeholder=\"Enter streetnumber\" class=\"form-control\" [(ngModel)]=\"user.person.address.streetNumber\">\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-8 form-group\">\n                <label>City</label>\n                <input type=\"text\" placeholder=\"Enter city name\" class=\"form-control\" [(ngModel)]=\"user.person.address.city\">\n            </div>\n            <div class=\"col-sm-4 form-group\">\n                <label>Zip</label>\n                <input type=\"text\" placeholder=\"Enter zip code\" class=\"form-control\" [(ngModel)]=\"user.person.address.zip\">\n            </div>\n        </div>\n\n        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Register</button>\n        </div>\n    </form>\n    ",
                        inputs: ['register']
                    }), 
                    __metadata('design:paramtypes', [userService_1.UserService, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            })();
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map