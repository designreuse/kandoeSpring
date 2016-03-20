import {Component, OnInit} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations/organisations.component.ts";
import {CardsComponent} from "./cards/cards.component.ts";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../security/TokenHelper";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {SessionService} from "../service/sessionService";
import {Session} from "../DOM/circleSession/session";
import {Theme} from "../DOM/theme";
import {Card} from "../DOM/card";
import {Organisation} from "../DOM/organisation";
import {ThemeService} from "../service/themeService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'loggedin-home',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/loggedInHome.html'
})

export class LoggedInHome implements OnInit {
    private router:Router = null;
    private user:User = User.createEmpty();
    private userService:UserService;
    public sessions:Session[] = [];

    constructor(private _sessionService:SessionService, router:Router, userService:UserService, private themeservice:ThemeService) {
        this.router = router;
        this.userService = userService;
    }

    ngOnInit() {
        this._sessionService.getUserSessions().subscribe((sessions:Session[])=> {
            console.log(JSON.stringify(sessions));
            this.sessions = sessions;

        });
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    showReveal(i) {
        var id = "#" + i;
        var el = $(document).find($(id));
        el.slideToggle("slow");
    }

    closeReveal(i) {
        var id = "#" + i;
        var el = $(document).find($(id));
        el.slideToggle("slow");
    }
    /*
     ------------------------- GENERAL ------------------------------------
     */

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    private getImageSrc(url:string):string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}
