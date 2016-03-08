System.register(['angular2/core', "../DOM/users/user", "../service/userService", 'angular2/router', '../security/TokenHelper'], function(exports_1) {
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
                    this.file = null;
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
                        console.log("user before servicecall: " + this.user.password);
                        this.userService.updateUser(this.user, this.file).subscribe(function (r) {
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
                UserProfileComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("profile-picture");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                UserProfileComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                UserProfileComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'userprofile',
                        templateUrl: 'app/components/userprofile.html'
                    }), 
                    __metadata('design:paramtypes', [userService_1.UserService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], UserProfileComponent);
                return UserProfileComponent;
                var _a;
            })();
            exports_1("UserProfileComponent", UserProfileComponent);
        }
    }
});
//# sourceMappingURL=userprofile.component.js.map