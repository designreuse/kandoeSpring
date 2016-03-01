/**
 * Created by Arne on 16/02/2016.
 */
import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations/organisations.component.ts";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../security/TokenHelper";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'loggedin-home',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
<div class="home col-md-10">
    <section class="settings">
         <a [routerLink]="['/Organisations']" class="glyphicon glyphicon-inbox large-screen"> My Organisations</a>
         <a [routerLink]="['/Themes']" class="glyphicon glyphicon-inbox large-screen"> My Themes </a>
         <a [routerLink]="['/Userprofile']" class="glyphicon">Edit profile</a>
         <a class="glyphicon glyphicon-log-out" (click)="logout()">Logout</a>
    </section>
    <div class="row col-md-offset-2">
         <div class="col-md-4">
            <div class="card">
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
            </div>
        </div>

    </div>
 </div>
        `
})

export class LoggedInHome {
    private router: Router = null;

    constructor(router: Router){
        this.router = router;
    }

    logout(){
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }
}
