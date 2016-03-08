System.register(['angular2/core', 'angular2/router', "./organisations/organisations.component", "./register.component", "./home", "./loggedInHome.component", "./themes/themeComponent", "./kandoeCard", "./userprofile.component", "./organisations/addOrganisation.component", "./themes/addThemeComponent", "./organisations/organisationDetail.component", "./themes/themeDetailComponent", "./chat/chatComponent", "./cards/cards.component", "./sessions/sessionDetail.component"], function(exports_1) {
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
    var core_1, router_1, organisations_component_1, register_component_1, home_1, loggedInHome_component_1, themeComponent_1, kandoeCard_1, userprofile_component_1, addOrganisation_component_1, addThemeComponent_1, organisationDetail_component_1, themeDetailComponent_1, chatComponent_1, cards_component_1, sessionDetail_component_1;
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
            function (themeComponent_1_1) {
                themeComponent_1 = themeComponent_1_1;
            },
            function (kandoeCard_1_1) {
                kandoeCard_1 = kandoeCard_1_1;
            },
            function (userprofile_component_1_1) {
                userprofile_component_1 = userprofile_component_1_1;
            },
            function (addOrganisation_component_1_1) {
                addOrganisation_component_1 = addOrganisation_component_1_1;
            },
            function (addThemeComponent_1_1) {
                addThemeComponent_1 = addThemeComponent_1_1;
            },
            function (organisationDetail_component_1_1) {
                organisationDetail_component_1 = organisationDetail_component_1_1;
            },
            function (themeDetailComponent_1_1) {
                themeDetailComponent_1 = themeDetailComponent_1_1;
            },
            function (chatComponent_1_1) {
                chatComponent_1 = chatComponent_1_1;
            },
            function (cards_component_1_1) {
                cards_component_1 = cards_component_1_1;
            },
            function (sessionDetail_component_1_1) {
                sessionDetail_component_1 = sessionDetail_component_1_1;
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
                        { path: '/organisations', as: 'Organisations', component: organisations_component_1.OrganisationsComponent },
                        { path: '/organisations/addOrganisation', as: 'AddOrganisation', component: addOrganisation_component_1.AddOrganisationComponent },
                        { path: '/organisations/:id', as: 'OrganisationDetail', component: organisationDetail_component_1.OrganisationDetailComponent },
                        { path: '/register', as: 'Register', component: register_component_1.RegisterComponent },
                        { path: '/themes', as: 'Themes', component: themeComponent_1.ThemeComponent },
                        { path: 'themes/:id', as: 'ThemeDetail', component: themeDetailComponent_1.ThemeDetailComponent },
                        { path: '/card', as: 'KandoeCard', component: kandoeCard_1.KandoeCard },
                        { path: '/userprofile', as: 'Userprofile', component: userprofile_component_1.UserProfileComponent },
                        { path: '/themes/addTheme', name: 'AddTheme', component: addThemeComponent_1.AddThemeComponent },
                        { path: '/chat', name: 'Chat', component: chatComponent_1.ChatComponent },
                        { path: '/addCard', as: 'AddCard', component: cards_component_1.CardsComponent },
                        { path: '/sessions/:id', as: 'SessionDetail', component: sessionDetail_component_1.SessionDetailComponent }
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