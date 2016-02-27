System.register(['angular2/core', 'angular2/router', "./organisations.component", "./register.component", "./home", "./loggedInHome.component", "./ThemeComponent", "./kandoeCard", "./userprofile.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, organisations_component_1, register_component_1, home_1, loggedInHome_component_1, ThemeComponent_1, kandoeCard_1, userprofile_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (organisations_component_1_1) {
                organisations_component_1 = organisations_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (loggedInHome_component_1_1) {
                loggedInHome_component_1 = loggedInHome_component_1_1;
            },
            function (ThemeComponent_1_1) {
                ThemeComponent_1 = ThemeComponent_1_1;
            },
            function (kandoeCard_1_1) {
                kandoeCard_1 = kandoeCard_1_1;
            },
            function (userprofile_component_1_1) {
                userprofile_component_1 = userprofile_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-kandoe'
                    }),
                    core_1.View({
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n    <router-outlet></router-outlet>\n    ",
                    }),
                    router_1.RouteConfig([
                        { path: '/home', as: 'Home', component: home_1.Home, useAsDefault: true },
                        { path: '/loggedIn', as: 'LoggedInHome', component: loggedInHome_component_1.LoggedInHome },
                        { path: '/organisations', name: 'Organisations', component: organisations_component_1.OrganisationsComponent },
                        { path: '/register', as: 'Register', component: register_component_1.RegisterComponent },
                        { path: '/theme', as: 'Theme', component: ThemeComponent_1.ThemeComponent },
                        { path: '/card', as: 'KandoeCard', component: kandoeCard_1.KandoeCard },
                        { path: '/userprofile', as: 'Userprofile', component: userprofile_component_1.UserProfileComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map