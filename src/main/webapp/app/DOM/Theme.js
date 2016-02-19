var link_1 = require("./link");
/**
 * Created by Jordan on 19/02/2016.
 */
var Theme = (function () {
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
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map