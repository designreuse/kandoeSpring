System.register(["angular2/core", "./register.component", "angular2/router", "../DOM/users/user", "../service/userService", "../security/TokenHelper", "../security/securityService", "../DOM/users/person"], function(exports_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, register_component_1, router_1, user_1, userService_1, TokenHelper_1, securityService_1, person_1;
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
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(router, userService, secService, path) {
                    var _this = this;
                    this.path = path;
                    this.router = router;
                    this.userService = userService;
                    this.securityService = secService;
                    if (TokenHelper_1.tokenNotExpired()) {
                        this.securityService.get(this.path + "login/check", true).subscribe(function (r) {
                            if (r.text().replace(/"/g, "") === "Facebook") {
                                FB.getLoginStatus(function (response) {
                                    if (response.status === "connected") {
                                        _this.router.navigate(['/LoggedInHome']);
                                    }
                                    else {
                                        localStorage.removeItem("id_token");
                                    }
                                });
                            }
                            else {
                                _this.router.navigate(['/LoggedInHome']);
                            }
                        }, function (e) {
                            localStorage.removeItem("id_token");
                        });
                    }
                }
                Home.prototype.login = function () {
                    var login = document.getElementById("login-form");
                    var register = document.getElementById("register-form");
                    $('html,body').animate({
                        scrollTop: $(".login-section").offset().top }, 'slow');
                    login.style.animationTimingFunction = "ease-in-out";
                    login.style.display = "block";
                    register.style.display = "none";
                };
                Home.prototype.register = function () {
                    var login = document.getElementById("login-form");
                    var register = document.getElementById("register-form");
                    $('html,body').animate({
                        scrollTop: $(".login-section").offset().top }, 'slow');
                    register.style.animationTimingFunction = "ease-in-out";
                    register.style.animationDuration = "3s";
                    login.style.display = "none";
                    register.style.display = "block";
                };
                Home.prototype.onSubmit = function () {
                    var _this = this;
                    this.userService.login(this.username, this.password)
                        .subscribe(function (res) {
                        localStorage.setItem("id_token", res.text());
                        _this.router.navigate(['/LoggedInHome']);
                    }, function (error) {
                        //todo display proper error
                        alert(error.text());
                    });
                };
                Home.prototype.facebook = function () {
                    var _this = this;
                    FB.login(function (response) {
                        if (response.authResponse) {
                            var u = new user_1.User();
                            FB.api('/me/picture?redirect=0', "get", function (re) {
                                console.log(re.data.url);
                                u.profilePicture = re.data.url;
                            });
                            FB.api('/me', "get", { fields: 'name,email,first_name,last_name' }, function (response) {
                                u.email = response.email;
                                u.facebookAccount = true;
                                u.username = response.name.replace(/ /g, "");
                                u.username += "_facebook";
                                var p = new person_1.Person();
                                p.firstname = response.first_name;
                                p.lastname = response.last_name;
                                u.person = p;
                                _this.userService.loginFacebook(u).subscribe(function (res) {
                                    localStorage.setItem("id_token", res.text());
                                    _this.router.navigate(['/LoggedInHome']);
                                }, function (error) {
                                    //todo proper error display
                                    alert(error.text());
                                });
                            });
                        }
                        else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, { scope: 'email,public_profile' });
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        directives: [register_component_1.RegisterComponent],
                        templateUrl: 'app/components/home.html'
                    }),
                    core_1.Injectable(),
                    __param(3, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService, securityService_1.SecurityService, String])
                ], Home);
                return Home;
                var _a;
            })();
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map