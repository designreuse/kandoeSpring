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
                function Theme(ThemeId, ThemeName, Description, Organisation) {
                    this.ThemeId = ThemeId;
                    this.ThemeName = ThemeName;
                    this.Description = Description;
                    this.Organisation = Organisation;
                }
                Theme.fromJson = function (json) {
                    var theme = new Theme(json.ThemeId, json.ThemeName, json.Description, json.Organisation);
                    theme.iconUrl = json.iconUrl;
                    for (var i = 0; i < json.links.length; i++) {
                        theme.links[i] = link_1.Link.fromJson(json.links[i]);
                    }
                    return theme;
                };
                return Theme;
            })();
            exports_1("Theme", Theme);
        }
    }
});
//# sourceMappingURL=Theme.js.map