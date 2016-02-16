System.register(['angular2/core', 'angular2/router', "./organisations.component"], function(exports_1) {
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
    var core_1, router_1, organisations_component_1;
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
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        template: "\n     <section class=\"settings\">\n            <a [routerLink]=\"['/Organisations']\" class=\"glyphicon glyphicon-inbox large-screen\"> My Organisations</a>\n    </section>\n    <router-outlet></router-outlet>\n    ",
                    }),
                    router_1.RouteConfig([
                        { path: '/organisations', name: 'Organisations', component: organisations_component_1.OrganisationsComponent, useAsDefault: true },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
/*

 //private organisations:Organisation[] = null;

 /*constructor(service:Service) {
 service.getOrganisations().subscribe((organisations:Organisation[])=> {
 this.organisations = organisations;

 })
 }

 <!-- <div class="container">
 <div class="row">
 <div class="test" *ng-for="#organisation of organisations"
 <p>{{organisation.organisationName}}</p>
 </div>
 </div>
 </div>-->
 */ 
//# sourceMappingURL=app.js.map