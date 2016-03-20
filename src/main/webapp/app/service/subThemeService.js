System.register(['rxjs/add/operator/map', 'angular2/core', "../DOM/subTheme", "../security/securityService", "./uploadService", "../DOM/card"], function(exports_1) {
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
    var core_1, subTheme_1, securityService_1, uploadService_1, card_1;
    var SubThemeService;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (uploadService_1_1) {
                uploadService_1 = uploadService_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            }],
        execute: function() {
            SubThemeService = (function () {
                function SubThemeService(path, securityService, uploadService) {
                    this.path = path;
                    this.securityService = securityService;
                    this.uploadService = uploadService;
                }
                SubThemeService.prototype.getUserSubThemes = function () {
                    return this.securityService.get(this.path + 'themes/currentUser', true)
                        .map(function (res) { return res.json(); })
                        .map(function (subThemes) { return subThemes.map(function (subTheme) { return subTheme_1.SubTheme.fromJson(subTheme); }); });
                };
                SubThemeService.prototype.createSubTheme = function (subTheme, file) {
                    var response;
                    if (file) {
                        response = this.uploadService.uploadFile(JSON.stringify(subTheme), file, this.path + 'subThemes/image');
                    }
                    else {
                        response = this.securityService.post(this.path + 'subThemes', JSON.stringify(subTheme), true);
                    }
                    return response.map(function (res) { return res.json(); })
                        .map(function (st) { return subTheme_1.SubTheme.fromJson(st); });
                };
                SubThemeService.prototype.getSubTheme = function (id) {
                    return this.securityService.get(this.path + 'subThemes/' + id, true)
                        .map(function (res) { return res.json(); })
                        .map(function (subTheme) { return subTheme_1.SubTheme.fromJson(subTheme); });
                };
                SubThemeService.prototype.getSubThemeCards = function (subThemeId) {
                    return this.securityService.get(this.path + 'subThemes/' + subThemeId + '/cards', true)
                        .map(function (res) { return res.json(); })
                        .map(function (cards) { return cards.map(function (card) { return card_1.Card.fromJson(card); }); });
                };
                SubThemeService.prototype.addCardsToSubTheme = function (cardIds, subThemeId) {
                    var cards = [];
                    for (var i = 0; i < cardIds.length; i++) {
                        var c = new card_1.Card();
                        c.cardId = cardIds[i];
                        cards[i] = c;
                    }
                    return this.securityService.post(this.path + 'subThemes/' + subThemeId + '/addCards', JSON.stringify(cards), true)
                        .map(function (res) { return res.json(); })
                        .map(function (subTheme) { return subTheme_1.SubTheme.fromJson(subTheme); });
                };
                SubThemeService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [String, securityService_1.SecurityService, uploadService_1.UploadService])
                ], SubThemeService);
                return SubThemeService;
            })();
            exports_1("SubThemeService", SubThemeService);
        }
    }
});
//# sourceMappingURL=subThemeService.js.map