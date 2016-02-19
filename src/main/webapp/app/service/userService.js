var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by amy on 16/02/2016.
 */
require('rxjs/add/operator/map');
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var UserService = (function () {
    function UserService(http, path) {
        this.http = null;
        this.http = http;
        this.path = path;
    }
    UserService.prototype.createUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(user));
        return this.http.post(this.path + 'users', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.DevPath'))
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map