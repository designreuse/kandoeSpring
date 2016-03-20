System.register(["../card", "../users/user", "../theme", "../subTheme"], function(exports_1) {
    var card_1, user_1, theme_1, subTheme_1;
    var Session;
    return {
        setters:[
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            }],
        execute: function() {
            Session = (function () {
                function Session() {
                }
                Session.fromJson = function (json) {
                    var session = new Session();
                    session.sessionId = json.sessionId;
                    session.sessionName = json.sessionName;
                    session.mode = json.mode;
                    session.type = json.type;
                    session.minCards = json.minCards;
                    session.maxCards = json.maxCards;
                    session.size = json.size;
                    session.userAddCards = json.userAddCards;
                    session.chosenCards = json.chosenCards;
                    session.themeId = json.themeId;
                    session.state = json.state;
                    session.isOrganiser = json.organiser;
                    session.startTime = new Date(json.startTime);
                    session.endTime = new Date(json.endTime);
                    if (json.cards) {
                        session.cards = [];
                        for (var i = 0; i < json.cards.length; i++) {
                            session.cards[i] = card_1.Card.fromJson(json.cards[i]);
                        }
                    }
                    if (json.users) {
                        session.users = [];
                        for (var i = 0; i < json.users.length; i++) {
                            session.users[i] = user_1.User.fromJson(json.users[i]);
                        }
                    }
                    if (json.theme) {
                        session.theme = theme_1.Theme.fromJson(json.theme);
                    }
                    if (json.subTheme) {
                        session.subTheme = subTheme_1.SubTheme.fromJson(json.subTheme);
                    }
                    return session;
                };
                Session.createEmpty = function () {
                    var session = new Session();
                    session.theme = theme_1.Theme.createEmpty();
                    session.subTheme = subTheme_1.SubTheme.createEmpty();
                    return session;
                };
                return Session;
            })();
            exports_1("Session", Session);
        }
    }
});
//# sourceMappingURL=session.js.map