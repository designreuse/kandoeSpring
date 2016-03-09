import {Component, OnInit} from 'angular2/core'
import {Session} from "../../DOM/circleSession/session";
import {SessionService} from "../../service/sessionService";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {ThemeService} from "../../service/themeService";
import {Theme} from "../../DOM/theme";
import {Card} from "../../DOM/card";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-session',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/sessions/addSession.html',
})

export class AddSession implements OnInit{
    private session:Session = Session.createEmpty();
    private sessionService:SessionService;
    private themes:Theme[];
    private themeService:ThemeService;
    private router:Router;
    private user: User = User.createEmpty();
    private cards:Card[];

    constructor(sessionService:SessionService, private _userService:UserService, router:Router, themeService: ThemeService) {
        this.sessionService = sessionService;
        this.router = router;
        this._userService=_userService;
        this.themeService=themeService;
    }


    ngOnInit() {
        this.themeService.getUserThemes().subscribe((themes:Theme[])=> {
            this.themes= themes;
            this.session.themeId = themes[0].themeId;
            this.cards = themes[0].cards;
        });
        this._userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    onSubmit() {
        this.sessionService.createSession(this.session)
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

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }
}