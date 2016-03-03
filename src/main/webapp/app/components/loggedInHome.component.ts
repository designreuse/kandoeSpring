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
    template: `
<div class="home col-md-12">
<nav class="navbar navbar-inverse " role="navigation">
    <div class="container">
        <div class="navbar-header ">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="./">
                KAN<span>DOE</span></a>
        </div>
    <section class="settings">
         <a [routerLink]="['/Organisations']" class="glyphicon glyphicon-inbox large-screen"> My Organisations</a>
          <a [routerLink]="['/KandoeCard']" class="glyphicon glyphicon-credit-card"> Cards</a>

         <a [routerLink]="['/Userprofile']" class="glyphicon">Edit profile</a>
         <a class="glyphicon glyphicon-log-out" (click)="logout()">Logout</a>
    </section>

    </div>

      <div>
     <img class="img-responsivenav img-thumbnailnav" id="profile-picturenav" align="right" src="https://zblogged.com/wp-content/uploads/2015/11/c1.png">
    </div>
    </nav>
    </div>
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

 <div class="footer">
    <footer class="footer-container">

        <p class="copy">© 2016 Kandoe Inc.</p>

    </footer>
      </div>   `
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
