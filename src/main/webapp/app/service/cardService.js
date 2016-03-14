System.register(['angular2/core', "./uploadService", "../security/securityService", "../DOM/card"], function(exports_1) {
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
    var core_1, uploadService_1, securityService_1, card_1;
    var CardService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (uploadService_1_1) {
                uploadService_1 = uploadService_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            }],
        execute: function() {
            CardService = (function () {
                function CardService(path, securityService, uploadService) {
                    this.path = path;
                    this.securityService = securityService;
                    this.uploadService = uploadService;
                }
                CardService.prototype.getAllCards = function () {
                    return this.securityService.get(this.path + 'cards', true)
                        .map(function (res) { return res.json(); })
                        .map(function (cards) { return cards.map(function (card) { return card_1.Card.fromJson(card); }); });
                };
                CardService.prototype.getCardById = function (id) {
                    return this.securityService.get(this.path + 'cards/' + id, true)
                        .map(function (res) { return res.json(); })
                        .map(function (card) { return card_1.Card.fromJson(card); });
                };
                CardService.prototype.createCard = function (card, file) {
                    console.log(card);
                    var value;
                    if (file) {
                        value = this.uploadService.uploadFile(JSON.stringify(card), file, this.path + 'cards/image');
                    }
                    else {
                        value = this.securityService.post(this.path + 'cards', JSON.stringify(card), true);
                    }
                    return value.map(function (res) { return res.json(); })
                        .map(function (card) { return card_1.Card.fromJson(card); });
                };
                CardService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('App.BackEndPath')), 
                    __metadata('design:paramtypes', [String, securityService_1.SecurityService, uploadService_1.UploadService])
                ], CardService);
                return CardService;
            })();
            exports_1("CardService", CardService);
        }
    }
});
//# sourceMappingURL=cardService.js.map