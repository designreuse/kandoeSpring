System.register(["./organisation", './card'], function(exports_1) {
    var organisation_1, card_1;
    var SubTheme;
    return {
        setters:[
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            }],
        execute: function() {
            SubTheme = (function () {
                function SubTheme() {
                    this.cards = [];
                }
                SubTheme.fromJson = function (json) {
                    var subTheme = new SubTheme();
                    subTheme.iconURL = json.iconURL;
                    subTheme.themeId = json.themeId;
                    subTheme.themeName = json.themeName;
                    subTheme.description = json.description;
                    if (json.organisation) {
                        subTheme.organisation = organisation_1.Organisation.fromJson(json.organisation);
                    }
                    if (json.cards) {
                        subTheme.cards = [];
                        for (var i = 0; i < json.cards.length; i++) {
                            subTheme.cards[i] = card_1.Card.fromJson(json.cards[i]);
                        }
                    }
                    return subTheme;
                };
                SubTheme.createEmpty = function () {
                    var subTheme = new SubTheme();
                    return subTheme;
                };
                return SubTheme;
            })();
            exports_1("SubTheme", SubTheme);
        }
    }
});
//# sourceMappingURL=subTheme.js.map