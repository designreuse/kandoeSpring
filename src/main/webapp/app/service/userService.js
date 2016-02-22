System.register(['rxjs/add/operator/map', 'angular2/http', 'angular2/core', "angular2/http"], function(exports_1) {
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
    var http_1, core_1, http_2;
    var UserService;
    return {
        setters:[
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http, path) {
                    this.http = null;
                    this.http = http;
                    this.path = path;
                }
                UserService.prototype.createUser = function (user) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    console.log(JSON.stringify(user));
                    return this.http.post(this.path + 'users', JSON.stringify(user), { headers: headers })
                        .map(function (res) { return res.json(); });
                };
                UserService.prototype.login = function (username, password) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    return this.http.post(this.path + 'login', "username=" + username + "&password=" + password, { headers: headers });
                };
                UserService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject('App.DevPath')), 
                    __metadata('design:paramtypes', [http_1.Http, String])
                ], UserService);
                return UserService;
            })();
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=userService.js.map