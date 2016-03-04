/**
 * Created by Arne on 16/02/2016.
 */
import {Component, OnInit} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations/organisations.component.ts";
import {CardsComponent} from "./cards/cards.component.ts";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../security/TokenHelper";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'loggedin-home',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/loggedInHome.html'
})

export class LoggedInHome implements OnInit{
    private router:Router = null;
    private user: User = User.createEmpty();
    private userService: UserService;

    ngOnInit() {
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    constructor(router:Router, userService: UserService) {
        this.router = router;
        this.userService = userService;
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    private getImageSrc(url:string): string {
            if (url) {
                if (url.indexOf("http://") > -1) {
                    return url;
                } else {
                    return url.replace(/"/g, "");
                }
            }
    }
}
