var person_1 = require("./person");
var address_1 = require("./address");
/**
 * Created by amy on 16/02/2016.
 */
var User = (function () {
    function User() {
    }
    User.createEmpty = function () {
        var user = new User;
        var person = new person_1.Person();
        var address = new address_1.Address();
        person.address = address;
        user.person = person;
        return user;
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map