var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require('rxjs/add/operator/map');
var organisation_1 = require("../DOM/organisation");
var core_1 = require('angular2/core');
var Theme_1 = require("../DOM/Theme");
var Service = (function () {
    function Service(http, path) {
        this.http = null;
        this.http = http;
        this.path = path;
    }
    Service.prototype.getOrganisations = function () {
        return this.http.get(this.path + 'organisations')
            .map(function (res) { return res.json(); })
            .map(function (organisations) { return organisations.map(function (organisation) { return organisation_1.Organisation.fromJson(organisation); }); });
    };
    Service.prototype.getThemes = function () {
        return this.http.get(this.path + 'themes')
            .map(function (res) { return res.json(); })
            .map(function (themes) { return themes.map(function (theme) { return Theme_1.Theme.fromJson(theme); }); });
    };
    Service = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.DevPath'))
    ], Service);
    return Service;
})();
exports.Service = Service;
//# sourceMappingURL=service.js.map