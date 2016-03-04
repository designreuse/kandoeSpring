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
                    var person = new person_1.Person();
                    var address = new address_1.Address();
                    address.city = json.person.address.city;
                    address.number = json.person.address.number;
                    address.street = json.person.address.street;
                    address.zip = json.person.address.zip;
                    person.address = address;
                    person.firstname = json.person.firstname;
                    person.lastname = json.person.lastname;
                    user.person = person;
                    if (json.facebookAccount) {
                        user.facebookAccount = json.facebookAccount;
                    }
                    return user;
                };
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map