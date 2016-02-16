import {Component, View, Input, Output} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, RouterLink} from 'angular2/router'
import {OrganisationsComponent} from "./organisations.component";


@Component({
    selector: 'my-kandoe'
})
@View({
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
     <section class="settings">
            <a [routerLink]="['/Organisations']" class="glyphicon glyphicon-inbox large-screen"> My Organisations</a>
    </section>
    <router-outlet></router-outlet>
    `,
})
@RouteConfig([
    {path: '/organisations', name: 'Organisations', component: OrganisationsComponent, useAsDefault: true },

])
export class AppComponent {
}


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