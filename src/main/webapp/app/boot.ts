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
import {Service} from "./service/service";
import {Home} from "./components/home";

bootstrap(Home,
    [
        // dependency injection
        Service,
        // http
        HTTP_PROVIDERS,
        // routing
        ROUTER_PROVIDERS,
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: Home}),
        provide(APP_BASE_HREF, {useValue: "/"}),
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);