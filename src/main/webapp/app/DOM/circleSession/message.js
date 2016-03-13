System.register([], function(exports_1) {
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message() {
                }
                Message.fromJson = function (json) {
                    var message = new Message();
                    message.username = json.username;
                    message.content = json.content;
                    return message;
                };
                return Message;
            })();
            exports_1("Message", Message);
        }
    }
});
//# sourceMappingURL=message.js.map