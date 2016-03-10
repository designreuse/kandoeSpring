System.register([], function(exports_1) {
    var Address;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by amy on 16/02/2016.
             */
            Address = (function () {
                function Address() {
                }
                Address.fromJson = function (json) {
                    var address = new Address();
                    address.city = json.city;
                    address.number = json.number;
                    address.street = json.street;
                    address.zip = json.zip;
                    return address;
                };
                return Address;
            })();
            exports_1("Address", Address);
        }
    }
});
//# sourceMappingURL=address.js.map