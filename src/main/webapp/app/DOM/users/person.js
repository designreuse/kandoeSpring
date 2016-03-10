System.register(["./address"], function(exports_1) {
    var address_1;
    var Person;
    return {
        setters:[
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            /**
             * Created by amy on 16/02/2016.
             */
            Person = (function () {
                function Person() {
                }
                Person.fromJson = function (json) {
                    var person = new Person();
                    person.address = new address_1.Address();
                    if (json.address) {
                        person.address = address_1.Address.fromJson(json.address);
                    }
                    person.firstname = json.firstname;
                    person.lastname = json.lastname;
                    return person;
                };
                return Person;
            })();
            exports_1("Person", Person);
        }
    }
});
//# sourceMappingURL=person.js.map