System.register(["./person", "./address"], function(exports_1) {
    var person_1, address_1;
    var User;
    return {
        setters:[
            function (person_1_1) {
                person_1 = person_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            /**
             * Created by amy on 16/02/2016.
             */
            User = (function () {
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
                User.fromJson = function (json) {
                    var user = new User();
                    user.username = json.username;
                    user.email = json.email;
                    user.profilePicture = json.profilePicture;
                    user.userId = json.userId;
                    user.person = new person_1.Person();
                    if (json.person) {
                        user.person = person_1.Person.fromJson(user.person);
                    }
                    if (json.facebookAccount) {
                        user.facebookAccount = json.facebookAccount;
                    }
                    user.position = json.position;
                    return user;
                };
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map