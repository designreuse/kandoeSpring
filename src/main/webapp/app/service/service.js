System.register(['rxjs/add/operator/map', "../DOM/organisation", 'angular2/http', 'angular2/core', "../DOM/Theme", "../security/securityService"], function(exports_1) {
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
    var organisation_1, http_1, core_1, Theme_1, securityService_1;
    var Service;
    return {
        setters:[
            function (_1) {},
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Theme_1_1) {
                Theme_1 = Theme_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            }],
        execute: function() {
            Service = (function () {
                function Service(http, path, securityService) {
                    this.http = null;
                    this.http = http;
                    this.path = path;
                    this.securityService = securityService;
                }
                Service.prototype.getAllOrganisations = function () {
                    return this.securityService.get(this.path + 'organisations', true)
                        .map(function (res) { return res.json(); })
                        .map(function (organisations) { return organisations.map(function (organisation) { return organisation_1.Organisation.fromJson(organisation); }); });
                };
                Service.prototype.getUserOrganisations = function () {
                    return this.securityService.get(this.path + 'organisations/currentUser', true)
                        .map(function (res) { return res.json(); })
                        .map(function (organisations) { return organisations.map(function (organisation) { return organisation_1.Organisation.fromJson(organisation); }); });
                };
                Service.prototype.getThemes = function () {
                    return this.securityService.get(this.path + 'themes', true)
                        .map(function (res) { return res.json(); })
                        .map(function (themes) { return themes.map(function (theme) { return Theme_1.Theme.fromJson(theme); }); });
                };
                Service = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject('App.DevPath')), 
                    __metadata('design:paramtypes', [http_1.Http, String, securityService_1.SecurityService])
                ], Service);
                return Service;
            })();
            exports_1("Service", Service);
        }
    }
});
//# sourceMappingURL=service.js.map