System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', "./service/userService", "./components/app", "./security/securityService", "./service/organisationService", "./service/uploadService", "./service/themeService"], function(exports_1) {
    var browser_1, core_1, router_1, http_1, userService_1, app_1, securityService_1, organisationService_1, uploadService_1, themeService_1;
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
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (securityService_1_1) {
                securityService_1 = securityService_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            },
            function (uploadService_1_1) {
                uploadService_1 = uploadService_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.AppComponent, [
                // dependency injection
                userService_1.UserService,
                securityService_1.SecurityService,
                organisationService_1.OrganisationService,
                themeService_1.ThemeService,
                uploadService_1.UploadService,
                // http
                http_1.HTTP_PROVIDERS,
                // routing
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_1.AppComponent }),
                core_1.provide(router_1.APP_BASE_HREF, { useValue: "/" }),
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                core_1.provide('App.BackEndPath', { useValue: "http://localhost:9966/Kandoe/api/" }),
                //provide('App.BackEndPath', {useValue: "http://wildfly-teamiip2kdgbe.rhcloud.com/api/"}),
                core_1.provide('App.DevPath', { useValue: "http://localhost:9966/Kandoe/api/" })
            ]);
        }
    }
});
//  http://wildfly-teamiip2kdgbe.rhcloud.com/api/
//  http://localhost:9966/Kandoe/api/ 
//# sourceMappingURL=boot.js.map