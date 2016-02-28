System.register(['angular2/core', "../DOM/users/user", "../service/userService", 'angular2/router', '../security/TokenHelper'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, userService_1, router_1, TokenHelper_1;
    var UserProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            }],
        execute: function() {
            UserProfileComponent = (function () {
                function UserProfileComponent(userService, router) {
                    this.user = user_1.User.createEmpty();
                    this.userService = null;
                    this.showChangePassword = false;
                    this.userService = userService;
                    this.router = router;
                }
                UserProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                UserProfileComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.showChangePassword) {
                        if (this.user.password != null && this.user.password != this.user.passwordConfirm) {
                            //todo proper error display
                            alert("new passwords don't match");
                        }
                        else if (this.user.oldPassword == null) {
                            //todo proper error display
                            alert("fill in old password");
                        }
                        else {
                            this.userService.changePassword(this.user).subscribe(function (res) {
                                _this.user.oldPassword = null;
                                _this.user.password = null;
                                _this.user.passwordConfirm = null;
                                _this.showChangePassword = false;
                                //todo proper display
                                alert("Password changed");
                            }, function (error) {
                                // proper error display
                                alert(error.text());
                            });
                        }
                    }
                    else {
                        this.userService.updateUser(this.user).subscribe(function (u) {
                            _this.router.navigate(['/LoggedInHome']);
                        }, function (error) {
                            //todo proper error display
                            alert(error.text());
                        });
                    }
                };
                UserProfileComponent.prototype.changePassword = function () {
                    this.showChangePassword = true;
                };
                UserProfileComponent.prototype.cancel = function () {
                    if (this.showChangePassword) {
                        this.showChangePassword = false;
                    }
                    else {
                        this.router.navigate(['/LoggedInHome']);
                    }
                };
                UserProfileComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'userprofile',
                        template: "\n     <form  class=\"col-lg-offset-3 col-lg-6\" method=\"post\" role=\"form\">\n        <div class=\"form-pad\">\n        <h3>Profile</h3>\n        <div *ngIf=\"!showChangePassword\">\n            <div class=\"form-group\">\n                <label>Username</label>\n                <input disabled type=\"text\" placeholder=\"Enter username\" class=\"form-control\" [(ngModel)]=\"user.username\">\n            </div>\n            <div class=\"form-group\">\n                <label>Email Address</label>\n                <input disabled type=\"text\" placeholder=\"Enter email address\" class=\"form-control\" [(ngModel)]=\"user.email\">\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-4 form-group\">\n                    <label>First Name</label>\n                    <input type=\"text\" placeholder=\"Enter first name\" class=\"form-control\" [(ngModel)]=\"user.person.firstname\">\n                </div>\n                <div class=\"col-sm-8 form-group\">\n                    <label>Last Name</label>\n                    <input type=\"text\" placeholder=\"Enter last name\" class=\"form-control\" [(ngModel)]=\"user.person.lastname\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-8 form-group\">\n                    <label>Street</label>\n                    <input type=\"text\" placeholder=\"Enter street\" class=\"form-control\" [(ngModel)]=\"user.person.address.street\">\n                </div>\n                <div class=\"col-sm-4 form-group\">\n                    <label>Number</label>\n                    <input type=\"text\" placeholder=\"Enter streetnumber\" class=\"form-control\" [(ngModel)]=\"user.person.address.number\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-8 form-group\">\n                    <label>City</label>\n                    <input type=\"text\" placeholder=\"Enter city name\" class=\"form-control\" [(ngModel)]=\"user.person.address.city\">\n                </div>\n                <div class=\"col-sm-4 form-group\">\n                    <label>Zip</label>\n                    <input type=\"text\" placeholder=\"Enter zip code\" class=\"form-control\" [(ngModel)]=\"user.person.address.zip\">\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"showChangePassword\">\n            <div class=\"form-group\">\n                <label>Old password</label>\n                <input type=\"password\" placeholder=\"Enter password\" class=\"form-control\" [(ngModel)]=\"user.oldPassword\">\n            </div>\n\n            <div class=\"form-group\">\n                <label>New password</label>\n                <input type=\"password\" placeholder=\"Enter password\" class=\"form-control\" [(ngModel)]=\"user.password\">\n            </div>\n            <div class=\"form-group\">\n                <label>Password confirmation</label>\n                <input type=\"password\" placeholder=\"Enter password again\" class=\"form-control\" [(ngModel)]=\"user.passwordConfirm\">\n            </div>\n        </div>\n\n\n        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"onSubmit()\">Save changes</button>\n        <button *ngIf=\"!showChangePassword\" type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"changePassword()\">Change password</button>\n        <button type=\"button\" class=\"btn btn-lg btn-info\" (click)=\"cancel()\">Cancel</button>\n        </div>\n    </form>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [userService_1.UserService, router_1.Router])
                ], UserProfileComponent);
                return UserProfileComponent;
            })();
            exports_1("UserProfileComponent", UserProfileComponent);
        }
    }
});
//# sourceMappingURL=userprofile.component.js.map