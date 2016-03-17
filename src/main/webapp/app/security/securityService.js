System.register(['rxjs/add/operator/map', 'angular2/http', 'angular2/core', "./TokenHelper", "angular2/http", "angular2/router"], function(exports_1) {
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
    var http_1, core_1, TokenHelper_1, http_2, router_1;
    var SecurityService;
    return {
        setters:[
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SecurityService = (function () {
                function SecurityService(http, path, router) {
                    this.http = null;
                    this.http = http;
                    this.path = path;
                    this.router = router;
                }
                SecurityService.prototype.get = function (url, withSecurity) {
                    var headers = new http_2.Headers();
                    if (withSecurity) {
                        if (TokenHelper_1.tokenNotExpired()) {
                            headers.append('Authorization', "Bearer " + localStorage.getItem("id_token"));
                        }
                        else {
                            this.router.navigate(["/Home"]);
                        }
                    }
                    return this.http.get(url, { headers: headers });
                };
                SecurityService.prototype.post = function (url, body, withSecurity) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    if (withSecurity) {
                        if (TokenHelper_1.tokenNotExpired()) {
                            headers.append('Authorization', "Bearer " + localStorage.getItem("id_token"));
                        }
                    }
                    return this.http.post(url, body, { headers: headers });
                };
                SecurityService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, String, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
                ], SecurityService);
                return SecurityService;
                var _a, _b;
            })();
            exports_1("SecurityService", SecurityService);
        }
    }
});
//# sourceMappingURL=securityService.js.map