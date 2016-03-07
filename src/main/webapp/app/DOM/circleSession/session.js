System.register([], function(exports_1) {
    var Session;
    return {
        setters:[],
        execute: function() {
            Session = (function () {
                function Session() {
                }
                Session.fromJson = function (json) {
                    var session = new Session();
                    session.sessionId = json.sessionId;
                    session.sessionMode = json.sessionMode;
                    session.sessionType = json.sessionType;
                    session.maxCards = json.maxCards;
                    session.minCards = json.minCards;
                    return session;
                };
                return Session;
            })();
            exports_1("Session", Session);
        }
    }
});
//# sourceMappingURL=session.js.map