import {Component, View, Input, Output} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {OrganisationsComponent} from "./organisations/organisations.component";
import {RegisterComponent} from "./register.component";
import {Home} from "./home";
import {LoggedInHome} from "./loggedInHome.component";
import {ThemeComponent} from "./themes/themeComponent";
import {KandoeCard} from "./kandoeCard";
import {UserProfileComponent} from "./userprofile.component";
import {AddOrganisationComponent} from "./organisations/addOrganisation.component";
import {AddThemeComponent} from "./themes/addThemeComponent";
import {OrganisationDetailComponent} from "./organisations/organisationDetail.component";


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
    {path: '/organisations', as: 'Organisations', component: OrganisationsComponent},
    {path: '/organisations/addOrganisation', as: 'AddOrganisation', component: AddOrganisationComponent},
    {path: '/organisations/:id/detail', as: 'OrganisationDetail', component: OrganisationDetailComponent},
    {path: '/register', as: 'Register', component: RegisterComponent},
    {path: '/themes',as :'Theme',component:ThemeComponent},
    {path: '/card', as: 'KandoeCard', component:KandoeCard},
    {path: '/userprofile', as: 'Userprofile', component: UserProfileComponent},
    {path: '/themes/addTheme', name: 'AddTheme', component: AddThemeComponent}
])
export class AppComponent {
}
