System.register(['angular2/core', 'angular2/router', "../DOM/users/user", "../service/userService"], function(exports_1) {
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
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register',
                        template: "\n    <div class=\"container\">\n    <h1 class=\"well\">Registration Form</h1>\n\t<div class=\"col-lg-12 well\">\n\t<div class=\"row\">\n\t\t\t\t<form>\n\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t        <div class=\"form-group\">\n\t\t\t\t            <label>Username</label>\n\t\t\t\t            <input type=\"text\" placeholder=\"Enter username\" class=\"form-control\" [(ngModel)]=\"user.username\">\n\t\t\t\t        </div>\n\t\t\t\t        <div class=\"form-group\">\n\t\t\t\t            <label>Password</label>\n\t\t\t\t            <input type=\"password\" placeholder=\"Enter password\" class=\"form-control\" [(ngModel)]=\"user.password\">\n\t\t\t\t        </div>\n\t\t\t\t        <div class=\"form-group\">\n\t\t\t\t           <!-- <label class=\"col-sm-2 control-label\" for=\"inputError\">\n                            Input with error and icon</label>\n                            <div class=\"col-sm-10\">\n                              <input type=\"text\" class=\"form-control\" id=\"inputError\">\n                              <span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>\n                            </div> -->\n\t\t\t\t\t        <label>Password confirmation</label>\n\t\t\t\t\t        <input type=\"password\" placeholder=\"Enter password again\" class=\"form-control\" [(ngModel)]=\"user.passwordConfirm\">\n\t\t\t\t\t    </div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-4 form-group\">\n\t\t\t\t\t\t\t\t<label>First Name</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter first name\" class=\"form-control\" [(ngModel)]=\"user.person.firstname\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-8 form-group\">\n\t\t\t\t\t\t\t\t<label>Last Name</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter last name\" class=\"form-control\" [(ngModel)]=\"user.person.lastname\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t    <div class=\"form-group\">\n                            <label>Email Address</label>\n                            <input type=\"text\" placeholder=\"Enter email address\" class=\"form-control\" [(ngModel)]=\"user.email\">\n\t\t\t\t\t    </div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t    <div class=\"col-sm-8 form-group\">\n                                <label>Street</label>\n                                <input type=\"text\" placeholder=\"Enter street\" class=\"form-control\" [(ngModel)]=\"user.person.address.street\">\n                            </div>\n                            <div class=\"col-sm-4 form-group\">\n                                <label>Number</label>\n                                <input type=\"text\" placeholder=\"Enter streetnumber\" class=\"form-control\" [(ngModel)]=\"user.person.address.streetNumber\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-8 form-group\">\n\t\t\t\t\t\t\t\t<label>City</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter city name\" class=\"form-control\" [(ngModel)]=\"user.person.address.city\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-4 form-group\">\n\t\t\t\t\t\t\t\t<label>Zip</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter zip code\" class=\"form-control\" [(ngModel)]=\"user.person.address.zip\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Submit</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t\t</div>\n\t</div>\n\t</div>\n    ",
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