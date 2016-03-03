/**
 * Created by Arne on 16/02/2016.
 */
import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations/organisations.component.ts";
import {CardsComponent} from "./cards/cards.component.ts";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../security/TokenHelper";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'loggedin-home',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/loggedInHome.html'
})

export class LoggedInHome {
    private router:Router = null;

    constructor(router:Router) {
        this.router = router;
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }
}
