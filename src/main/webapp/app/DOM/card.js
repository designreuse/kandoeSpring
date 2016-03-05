System.register(["./link", "./theme"], function(exports_1) {
    var link_1, theme_1;
    var Card;
    return {
        setters:[
            function (link_1_1) {
                link_1 = link_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            }],
        execute: function() {
            Card = (function () {
                function Card() {
                }
                Card.createEmpty = function () {
                    var card = new Card();
                    card.theme = theme_1.Theme.createEmpty();
                    return card;
                };
                Card.fromJson = function (json) {
                    var card = new Card();
                    card.cardId = json.cardId;
                    card.description = json.description;
                    card.imageURL = json.imageURL;
                    if (json.links) {
                        for (var i = 0; i < json.links.length; i++) {
                            card.links[i] = link_1.Link.fromJson(json.links[i]);
                        }
                    }
                    if (json.theme) {
                        card.theme = theme_1.Theme.fromJson(json.theme);
                    }
                    if (json.themeId) {
                        card.themeId = json.themeId;
                    }
                    return card;
                };
                return Card;
            })();
            exports_1("Card", Card);
        }
    }
});
//# sourceMappingURL=card.js.map