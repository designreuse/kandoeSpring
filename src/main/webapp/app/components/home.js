System.register(["angular2/core", "./register.component", "angular2/router", "../service/userService", "../security/TokenHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, register_component_1, router_1, userService_1, TokenHelper_1;
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
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(router, userService) {
                    this.router = router;
                    this.userService = userService;
                    if (TokenHelper_1.tokenNotExpired()) {
                        this.router.navigate(['/LoggedInHome']);
                    }
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
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        directives: [register_component_1.RegisterComponent],
                        templateUrl: 'app/components/home.html'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, userService_1.UserService])
                ], Home);
                return Home;
                var _a;
            })();
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map