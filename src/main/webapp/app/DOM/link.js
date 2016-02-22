System.register([], function(exports_1) {
    var Link;
    return {
        setters:[],
        execute: function() {
            Link = (function () {
                function Link() {
                }
                Link.fromJson = function (json) {
                    var link = new Link();
                    return link;
                };
                return Link;
            })();
            exports_1("Link", Link);
        }
    }
});
//# sourceMappingURL=link.js.map