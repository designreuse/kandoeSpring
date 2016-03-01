System.register(['rxjs/add/operator/map', "../DOM/organisation", 'angular2/core', "../DOM/users/user", "../security/securityService", "./uploadService"], function(exports_1) {
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
    var organisation_1, core_1, user_1, securityService_1, uploadService_1;
    var OrganisationService;
    return {
        setters:[
            function (_1) {},
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (uploadService_1_1) {
                uploadService_1 = uploadService_1_1;
            }],
        execute: function() {
            OrganisationService = (function () {
                function OrganisationService(path, securityService, uploadService) {
                    this.path = path;
                    this.securityService = securityService;
                    this.uploadService = uploadService;
                }
                OrganisationService.prototype.getAllOrganisations = function () {
                    return this.securityService.get(this.path + 'organisations', true)
                        .map(function (res) { return res.json(); })
                        .map(function (organisations) { return organisations.map(function (organisation) { return organisation_1.Organisation.fromJson(organisation); }); });
                };
                OrganisationService.prototype.getUserOrganisations = function () {
                    return this.securityService.get(this.path + 'organisations/currentUser', true)
                        .map(function (res) { return res.json(); })
                        .map(function (organisations) { return organisations.map(function (organisation) { return organisation_1.Organisation.fromJson(organisation); }); });
                };
                OrganisationService.prototype.getOrganisationById = function (id) {
                    return this.securityService.get(this.path + 'organisations/' + id, true)
                        .map(function (res) { return res.json(); })
                        .map(function (org) { return organisation_1.Organisation.fromJson(org); });
                };
                OrganisationService.prototype.createOrganisation = function (org, file) {
                    if (file) {
                        return this.uploadService.createOrganisation(JSON.stringify(org), file);
                    }
                    else {
                        return this.securityService.post(this.path + 'organisations', JSON.stringify(org), true);
                    }
                };
                OrganisationService.prototype.getOrganisationOrganisers = function (orgId) {
                    return this.securityService.get(this.path + 'organisations/' + orgId + '/organisers', true)
                        .map(function (res) { return res.json(); })
                        .map(function (users) { return users.map(function (u) { return user_1.User.fromJson(u); }); });
                };
                OrganisationService.prototype.getOrganisationMembers = function (orgId) {
                    return this.securityService.get(this.path + 'organisations/' + orgId + '/members', true)
                        .map(function (res) { return res.json(); })
                        .map(function (users) { return users.map(function (u) { return user_1.User.fromJson(u); }); });
                };
                OrganisationService.prototype.addMemberToOrganisation = function (orgId, mail) {
                    var requestparam = "?mail=" + mail;
                    return this.securityService.post(this.path + 'organisations/' + orgId + "/addMember" + requestparam, "", true)
                        .map(function (res) { return res.json(); })
                        .map(function (u) { return user_1.User.fromJson(u); });
                };
                OrganisationService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [String, securityService_1.SecurityService, uploadService_1.UploadService])
                ], OrganisationService);
                return OrganisationService;
            })();
            exports_1("OrganisationService", OrganisationService);
        }
    }
});
//# sourceMappingURL=organisationService.js.map