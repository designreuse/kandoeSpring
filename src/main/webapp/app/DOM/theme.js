System.register(["./organisation"], function(exports_1) {
    var organisation_1;
    var Theme;
    return {
        setters:[
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
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
                    theme.iconURL = json.iconURL;
                    theme.themeId = json.themeId;
                    theme.themeName = json.themeName;
                    theme.description = json.description;
                    theme.organisation = organisation_1.Organisation.fromJson(json.organisation);
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