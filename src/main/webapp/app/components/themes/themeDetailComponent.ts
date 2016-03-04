import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";
import {RouteParams} from "angular2/router";
import {User} from "../../DOM/users/user";
import {UserService} from "../../service/userService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/themeDetailComponent.html',
    inputs: ['theme']
})

export class ThemeDetailComponent implements OnInit {
    public theme:Theme = Theme.createEmpty();
    public org:Organisation=Organisation.createEmpty;
	private themeId: number;
    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(private _themeService:ThemeService, private _router:Router, private _userService:UserService, routeParams: RouteParams) {
        this.userService=_userService;
		this.themeId = +routeParams.params["id"];
    }

    ngOnInit() {
        this._themeService.getTheme(this.themeId).subscribe(theme => {
            this.theme = theme;
            this.org=this.theme.organisation;
        });
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }
    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    private getImageSrc(url: string): string {
        if(url){
            if(url.indexOf("http://") > -1){
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}