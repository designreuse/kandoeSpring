System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', "./service/service", "./components/home"], function(exports_1) {
    var browser_1, core_1, router_1, http_1, service_1, home_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(home_1.Home, [
                // dependency injection
                service_1.Service,
                // http
                http_1.HTTP_PROVIDERS,
                // routing
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: home_1.Home }),
                core_1.provide(router_1.APP_BASE_HREF, { useValue: "/" }),
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map