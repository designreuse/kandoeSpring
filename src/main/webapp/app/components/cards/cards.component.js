System.register(["../../security/TokenHelper", 'angular2/core', "angular2/router", "../../service/cardService"], function(exports_1) {
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
    var TokenHelper_1, core_1, router_1, cardService_1;
    var CardsComponent;
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
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            }],
        execute: function() {
            CardsComponent = (function () {
                function CardsComponent(_cardService, _router) {
                    this._cardService = _cardService;
                    this._router = _router;
                    this.cards = [];
                }
                CardsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._cardService.getAllCards().subscribe(function (cards) { return _this.cards = cards; });
                    $('#input-search').on('keyup', function () {
                        var rex = new RegExp($(this).val(), 'i');
                        $('.searchable-container .items').hide();
                        $('.searchable-container .items').filter(function () {
                            return rex.test($(this).text());
                        }).show();
                    });
                };
                CardsComponent.prototype.getImageSrc = function (url, id) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                };
                CardsComponent.prototype.sortNameAsc = function () {
                    var items = $('#sort-list li.items').get();
                    items.sort(function (a, b) {
                        var keyA = $(a).find("h2.title").text();
                        var keyB = $(b).find("h2.title").text();
                        if (keyA < keyB)
                            return -1;
                        if (keyA > keyB)
                            return 1;
                        return 0;
                    });
                    var ul = $('#sort-list');
                    $.each(items, function (i, li) {
                        ul.append(li);
                    });
                };
                CardsComponent.prototype.sortNameDesc = function () {
                    var items = $('#sort-list li.items').get();
                    items.sort(function (a, b) {
                        var keyA = $(a).find("h2.title").text();
                        var keyB = $(b).find("h2.title").text();
                        if (keyA > keyB)
                            return -1;
                        if (keyA < keyB)
                            return 1;
                        return 0;
                    });
                    var ul = $('#sort-list');
                    $.each(items, function (i, li) {
                        ul.append(li);
                    });
                };
                CardsComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'cards',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        template: "\n <div class=\"container clearfix\">\n            <div class=\"col-xs-12 col-sm-offset-3 col-sm-6\">\n                <form class=\"form-search\">\n                    <div class=\"input-group dropdown\">\n                        <input id=\"input-search\" class=\"form-control\"  placeholder=\"Search organisations...\" >\n                        <div class=\"btn-group input-group-btn\" role=\"group\">\n                            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" id =\"filter\" data-toggle=\"dropdown\" >\n                            <span class=\"glyphicon glyphicon-filter\"></span>\n                            <span class=\"caret\"></span></button>\n                            <ul class=\"dropdown-menu\">\n                                <li><span class=\"sort-option\" (click)=\"sortNameAsc()\">Name A-Z</span></li>\n                                <li><span class=\"sort-option\" (click)=\"sortNameDesc()\">Name Z-A</span></li>\n                                <li><a href=\"#\">Address City</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n\n    <div class=\"container main\">\n    \t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 col-sm-offset-1 col-sm-10\">\n\t\t\t\t<ul class=\"searchable-container\">\n\t\t\t\t<div class=\"card-list col-1-4\">\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t    <a [routerLink]=\"['/AddCard']\" >\n                                <div class=\"id\"><p>0</p></div>\n                                <span class=\"add glyphicon glyphicon-plus-sign\"></span>\n                                <div class=\"info\">\n                                    <h2 class=\"title\">Add a card</h2>\n                                    <p class=\"desc\">Create your own card!</p>\n                                </div>\n                                <div class=\"social\">\n                                    <ul>\n                                        <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                        <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                        <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                    </ul>\n                                </div>\n                            </a>\n                        </li>\n\n\t\t\t\t    <div *ngFor=\"#card of cards; #i = index\" id=\"sort-list\">\n\n                        <li class=\"items\">\n                        <a [routerLink]=\"['/CardDetail', {id:card.cardId}]\">\n                            <div class=\"id\"><p>{{i+1}}</p></div>\n                            <img alt=\"logo\" [src]=\"getImageSrc(card.imageURL, card.cardId)\" />\n                            <div class=\"info\">\n                                <h2 class=\"desc\">{{card.description}}</h2>\n                            </div>\n                            <div class=\"social\">\n                                <ul>\n                                    <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                    <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                    <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                                </ul>\n                            </div>\n                            </a>\n                        </li>\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\n\t\t\t</div>\n\t\t</div>\n\n    </div>\n\n    ",
                        inputs: ['cards']
                    }), 
                    __metadata('design:paramtypes', [cardService_1.CardService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], CardsComponent);
                return CardsComponent;
                var _a;
            })();
            exports_1("CardsComponent", CardsComponent);
        }
    }
});
//# sourceMappingURL=cards.component.js.map