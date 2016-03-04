import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/themeComponent.html',
    inputs: ['themes']
})

export class ThemeComponent  implements OnInit {
    public themes:Theme[] = [];
    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(private _themeService:ThemeService, private _router:Router, private _userService:UserService) {
        this.userService=_userService;
    }

    ngOnInit() {
        this._themeService.getUserThemes().subscribe((themes:Theme[])=> this.themes = themes);
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

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