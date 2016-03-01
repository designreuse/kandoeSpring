System.register(['rxjs/add/operator/map', 'angular2/core', "../DOM/theme", "../security/securityService", "./uploadService"], function(exports_1) {
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
    var core_1, theme_1, securityService_1, uploadService_1;
    var ThemeService;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (uploadService_1_1) {
                uploadService_1 = uploadService_1_1;
            }],
        execute: function() {
            /**
             * Created by Jordan on 29/02/2016.
             */
            ThemeService = (function () {
                function ThemeService(path, securityService, uploadService) {
                    this.path = path;
                    this.securityService = securityService;
                    this.uploadService = uploadService;
                }
                ThemeService.prototype.getAllThemes = function () {
                    return this.securityService.get(this.path + 'themes', true)
                        .map(function (res) { return res.json(); })
                        .map(function (themes) { return themes.map(function (theme) { return theme_1.Theme.fromJson(theme); }); });
                };
                ThemeService.prototype.getUserThemes = function () {
                    return this.securityService.get(this.path + 'themes/currentUser', true)
                        .map(function (res) { return res.json(); })
                        .map(function (themes) { return themes.map(function (theme) { return theme_1.Theme.fromJson(theme); }); });
                };
                ThemeService.prototype.createTheme = function (theme, file) {
                    console.log(theme);
                    return this.securityService.post(this.path + 'themes', JSON.stringify(theme), true);
                };
                ThemeService.prototype.getTheme = function (id) {
                    return this.securityService.get(this.path + 'themes/' + id, true)
                        .map(function (res) { return res.json(); })
                        .map(function (theme) { return theme_1.Theme.fromJson(theme); });
                };
                ThemeService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [String, securityService_1.SecurityService, uploadService_1.UploadService])
                ], ThemeService);
                return ThemeService;
            })();
            exports_1("ThemeService", ThemeService);
        }
    }
});
//# sourceMappingURL=themeService.js.map