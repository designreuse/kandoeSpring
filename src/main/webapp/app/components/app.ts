import {Component, View, Input, Output} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {OrganisationsComponent} from "./organisations/organisations.component";
import {RegisterComponent} from "./register.component";
import {Home} from "./home";
import {LoggedInHome} from "./loggedInHome.component";
import {ThemeComponent} from "./themes/themeComponent";
import {UserProfileComponent} from "./userprofile.component";
import {AddOrganisationComponent} from "./organisations/addOrganisation.component";
import {AddThemeComponent} from "./themes/addThemeComponent";
import {AddSubThemeComponent} from "./themes/subThemes/addSubTheme.component";
import {SubThemeComponent} from "./themes/subThemes/subTheme.component";
import {OrganisationDetailComponent} from "./organisations/organisationDetail.component";
import {ThemeDetailComponent} from "./themes/themeDetailComponent";
import {ChatComponent} from "./chat/chatComponent";
import {CardsComponent} from "./cards/cards.component";
import {SessionDetailComponent} from "./sessions/sessionDetail.component";
import {AddCardComponent} from "./cards/addCard.component";
import {AddSession} from "./sessions/addSession";
import {SubThemeDetailComponent} from "./themes/subThemes/subThemeDetail.component";


declare var jsColor: any;

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
    {path: '/organisations/:id', as: 'OrganisationDetail', component: OrganisationDetailComponent},
    {path: '/register', as: 'Register', component: RegisterComponent},
    {path: '/themes', as: 'Themes', component: ThemeComponent},
    {path: 'themes/:id', as: 'ThemeDetail', component: ThemeDetailComponent},
    {path: '/userprofile', as: 'Userprofile', component: UserProfileComponent},
    {path: '/themes/addTheme', name: 'AddTheme', component: AddThemeComponent},
    {path: '/themes/addSubTheme', name: 'AddSubTheme', component: AddSubThemeComponent},
    {path: '/chat', name: 'Chat', component: ChatComponent},
    {path: '/themes/:id/subThemesDetail', name: 'SubThemesDetail', component: SubThemeDetailComponent},
    {path: '/themes/:id/subThemes', name: 'SubThemes', component: SubThemeComponent},
    {path: 'themes/:id/addCard', as: 'AddCard', component: AddCardComponent},
    {path: '/sessions/:id', as: 'SessionDetail', component: SessionDetailComponent},
    {path: '/sessions/addSession', as: 'AddSession', component: AddSession}
])
export class AppComponent {
}
