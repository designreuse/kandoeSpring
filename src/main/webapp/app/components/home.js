System.register(["angular2/core", "./register.component", "angular2/router", "../DOM/users/user", "../service/userService", "../security/TokenHelper", "../security/securityService", "../DOM/users/person"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                    login.scrollIntoView();
                    login.style.animationTimingFunction = "ease-in-out";
                    login.style.display = "block";
                    register.style.display = "none";
                };
                Home.prototype.register = function () {
                    var login = document.getElementById("login-form");
                    var register = document.getElementById("register-form");
                    register.scrollIntoView();
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
                    __metadata('design:paramtypes', [router_1.Router, userService_1.UserService, securityService_1.SecurityService, String])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
            $(function () {
                $('a[href^="#login-form"]').click(function (e) {
                    var target = $(this).attr('href');
                    var strip = target.slice(1);
                    var anchor = $("a[name='" + strip + "']");
                    e.preventDefault();
                    $('html,body').animate({
                        scrollTop: anchor.offset().top
                    }, 'slow');
                });
            });
        }
    }
});
//# sourceMappingURL=home.js.map