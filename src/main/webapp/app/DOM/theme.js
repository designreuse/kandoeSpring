System.register(["./organisation", './card', "./subTheme"], function(exports_1) {
    var organisation_1, card_1, subTheme_1;
    var Theme;
    return {
        setters:[
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            }],
        execute: function() {
            /**
             * Created by Jordan on 19/02/2016.
             */
            Theme = (function () {
                function Theme() {
                    this.cards = [];
                    this.subThemes = [];
                }
                Theme.fromJson = function (json) {
                    var theme = new Theme();
                    theme.iconURL = json.iconURL;
                    theme.themeId = json.themeId;
                    theme.themeName = json.themeName;
                    theme.description = json.description;
                    if (json.organisation) {
                        theme.organisation = organisation_1.Organisation.fromJson(json.organisation);
                    }
                    if (json.cards) {
                        theme.cards = [];
                        for (var i = 0; i < json.cards.length; i++) {
                            theme.cards[i] = card_1.Card.fromJson(json.cards[i]);
                        }
                    }
                    if (json.subThemes) {
                        theme.subThemes = [];
                        for (var i = 0; i < json.subThemes.length; i++) {
                            theme.subThemes[i] = subTheme_1.SubTheme.fromJson(json.subThemes[i]);
                        }
                    }
                    return theme;
                };
                Theme.createEmpty = function () {
                    var theme = new Theme();
                    return theme;
                };
                return Theme;
            })();
            exports_1("Theme", Theme);
        }
    }
});
//# sourceMappingURL=theme.js.map