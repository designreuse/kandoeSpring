System.register(["./link"], function(exports_1) {
    var link_1;
    var Organisation;
    return {
        setters:[
            function (link_1_1) {
                link_1 = link_1_1;
            }],
        execute: function() {
            Organisation = (function () {
                function Organisation() {
                }
                Organisation.fromJson = function (json) {
                    var organisation = new Organisation();
                    organisation.organisationId = json.organisationId;
                    organisation.organisationName = json.organisationName;
                    organisation.address = json.address;
                    organisation.logoUrl = json.logoURL;
                    if (json.links) {
                        for (var i = 0; i < json.links.length; i++) {
                            organisation.links[i] = link_1.Link.fromJson(json.links[i]);
                        }
                    }
                    return organisation;
                };
                Organisation.createEmpty = function () {
                    var org = new Organisation();
                    return org;
                };
                return Organisation;
            })();
            exports_1("Organisation", Organisation);
        }
    }
});
//# sourceMappingURL=organisation.js.map