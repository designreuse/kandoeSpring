System.register(["./link"], function(exports_1) {
    var link_1;
    var Theme;
    return {
        setters:[
            function (link_1_1) {
                link_1 = link_1_1;
            }],
        execute: function() {
            /**
             * Created by Jordan on 19/02/2016.
             */
            Theme = (function () {
                function Theme() {
                }
                Theme.fromJson = function (json) {
                    var theme = new Theme();
                    theme.iconUrl = json.iconUrl;
                    theme.themeId = json.themeId;
                    theme.themeName = json.themeName;
                    theme.description = json.description;
                    theme.organisation = json.organisation;
                    for (var i = 0; i < json.links.length; i++) {
                        theme.links[i] = link_1.Link.fromJson(json.links[i]);
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