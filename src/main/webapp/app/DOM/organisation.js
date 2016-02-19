var link_1 = require("./link");
var Organisation = (function () {
    function Organisation(organisationId, organisationName) {
        this.organisationId = organisationId;
        this.organisationName = organisationName;
    }
    Organisation.fromJson = function (json) {
        var organisation = new Organisation(json.organisationId, json.organisationName);
        organisation.address = json.address;
        organisation.logoUrl = json.logoUrl;
        for (var i = 0; i < json.links.length; i++) {
            organisation.links[i] = link_1.Link.fromJson(json.links[i]);
        }
        return organisation;
    };
    return Organisation;
})();
exports.Organisation = Organisation;
//# sourceMappingURL=organisation.js.map