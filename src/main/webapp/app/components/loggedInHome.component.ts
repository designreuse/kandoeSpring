/**
 * Created by Arne on 16/02/2016.
 */
import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations.component";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'loggedin-home',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
        <div class="home">
            <section class="settings">
                    <a [routerLink]="['/Organisations']" class="glyphicon glyphicon-inbox large-screen"> My Organisations</a>
            </section>
        </div>
        `
})

export class LoggedInHome {
    private router: Router = null;

    constructor(router: Router){
        this.router = router;
    }


}
