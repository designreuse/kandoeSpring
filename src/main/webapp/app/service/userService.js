System.register(['rxjs/add/operator/map', 'angular2/http', 'angular2/core', "../security/securityService"], function(exports_1) {
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
    var http_1, core_1, securityService_1;
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
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http, path, securityService) {
                    this.http = null;
                    this.http = http;
                    this.path = path;
                    this.securityService = securityService;
                }
                UserService.prototype.createUser = function (user) {
                    return this.securityService.post(this.path + 'users', JSON.stringify(user), false);
                };
                UserService.prototype.login = function (username, password) {
                    return this.securityService.post(this.path + 'login', "{ \"username\": \"" + username + "\",\"password\": \"" + password + "\" }", false);
                };
                UserService.prototype.getCurrentUser = function () {
                    return this.securityService.get(this.path + 'users/currentUser', true)
                        .map(function (res) { return res.json(); });
                };
                UserService.prototype.updateUser = function (user) {
                    return this.securityService.post(this.path + 'users/updateUser', JSON.stringify(user), true)
                        .map(function (res) { return res.json(); });
                };
                UserService.prototype.changePassword = function (user) {
                    return this.securityService.post(this.path + 'users/changePassword', JSON.stringify(user), true);
                };
                UserService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, String, securityService_1.SecurityService])
                ], UserService);
                return UserService;
                var _a;
            })();
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=userService.js.map