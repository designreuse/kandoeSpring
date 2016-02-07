System.register(['./app', 'angular2/platform/browser'], function(exports_1) {
    var app_1, browser_1;
    return {
        setters:[
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.App);
        }
    }
});
//# sourceMappingURL=main.js.map