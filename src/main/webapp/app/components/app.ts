import {Component, View, Input, Output} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {OrganisationsComponent} from "./organisations/organisations.component";
import {RegisterComponent} from "./register.component";
import {Home} from "./home";
import {LoggedInHome} from "./loggedInHome.component";
import {ThemeComponent} from "./ThemeComponent";
import {KandoeCard} from "./kandoeCard";
import {UserProfileComponent} from "./userprofile.component";
import {AddOrganisationComponent} from "./organisations/addOrganisation.component";


@Component({
    selector: 'my-kandoe'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
    <router-outlet></router-outlet>
    `,
})
@RouteConfig([
    {path: '/home', as: 'Home', component: Home, useAsDefault: true},
    {path: '/loggedIn', as: 'LoggedInHome', component: LoggedInHome},
    {path: '/organisations', name: 'Organisations', component: OrganisationsComponent},
    {path: '/organisations/addOrganisation', name: 'AddOrganisation', component: AddOrganisationComponent},
    {path: '/register', as: 'Register', component: RegisterComponent},
    {path: '/theme',as :'Theme',component:ThemeComponent},
    {path: '/card', as: 'KandoeCard', component:KandoeCard},
    {path: '/userprofile', as: 'Userprofile', component: UserProfileComponent}

])
export class AppComponent {
}
