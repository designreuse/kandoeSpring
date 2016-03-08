System.register(["../../security/TokenHelper", 'angular2/core', "angular2/router", "../../DOM/card", "../../service/cardService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var TokenHelper_1, core_1, router_1, card_1, cardService_1;
    var AddCardComponent;
    return {
        setters:[
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            }],
        execute: function() {
            AddCardComponent = (function () {
                function AddCardComponent(cardService, router) {
                    this.card = card_1.Card.createEmpty();
                    this.file = null;
                    this.cardService = cardService;
                    this.router = router;
                }
                AddCardComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddCardComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.cardService.createCard(this.card, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Cards']);
                        _this.file = null;
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert(error.text());
                    });
                };
                AddCardComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-card',
                        template: "\n     <header>\n        <div class=\"container clearfix\">\n            <h3><span class=\"glyphicon glyphicon-plus-sign\"></span> Add new card</h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <form  class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\">\n            <div class=\"form-padadd-org\">\n\n                <div class=\"form-group\">\n                    <label>Description</label>\n                    <input type=\"text\" placeholder=\"Enter card description\" class=\"form-control\" [(ngModel)]=\"card.description\">\n                </div>\n\n                <div class=\"form-group\">\n                    <label>Image</label>\n                    <input type=\"file\" multiple=\"false\" (change)=\"onFileChange($event)\">\n                </div>\n                <div class=\"items\">\n                    <div class=\"item\">\n                        <div class=\"id\"><p>1</p></div>\n                        <img alt=\"logo\" [src]=\"getImageSrc(card.imageURL, card.cardId)\" />\n                        <div class=\"info\">\n                            <h2 class=\"title\">{{card.description}}</h2>\n\n                        </div>\n                        <div class=\"social\">\n                            <ul>\n                                <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn btn-lg btn-info glyphicon glyphicon-plus\" (click)=\"onSubmit()\"> Create new card</button>\n            </div>\n        </form>\n\n    <form id=\"form1\" runat=\"server\">\n        <input type='file' id=\"imgInp\" />\n        <br>\n        <img id=\"blah\" src=\"http://i.imgur.com/zAyt4lX.jpg\" alt=\"your image\" height=\"100\" />\n    </form>\n    </div>\n            "
                    }), 
                    __metadata('design:paramtypes', [cardService_1.CardService, router_1.Router])
                ], AddCardComponent);
                return AddCardComponent;
            })();
            exports_1("AddCardComponent", AddCardComponent);
        }
    }
});
//# sourceMappingURL=addCard.component.js.map