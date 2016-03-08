/**
 * Created by michaelkees on 12/02/16.
 */
import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core'
import {
    APP_BASE_HREF,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    ROUTER_PRIMARY_COMPONENT,
    HashLocationStrategy,
    LocationStrategy,
    RouteConfig
} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import {UserService} from "./service/userService";
import {AppComponent} from "./components/app";
import {SecurityService} from "./security/securityService";
import {OrganisationService} from "./service/organisationService";
import {UploadService} from "./service/uploadService";
import {ThemeService} from "./service/themeService";
import {CardService} from "./service/cardService";
import {SessionService} from "./service/sessionService";


bootstrap(AppComponent,
[
    // dependency injection
    UserService,
    SecurityService,
    OrganisationService,
    ThemeService,
    UploadService,
    CardService,
    SessionService,
    // http
    HTTP_PROVIDERS,
    // routing
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(APP_BASE_HREF, {useValue: "/"}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
   provide('App.BackEndPath', {useValue: "https://wildfly-teamiip2kdgbe.rhcloud.com/api/"}),
    provide('App.DevPath', {useValue: "http://localhost:9966/Kandoe/api/"})
]);
//  https://wildfly-teamiip2kdgbe.rhcloud.com/api/
//  http://localhost:9966/Kandoe/api/