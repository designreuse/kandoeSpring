import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../../service/themeService";
import {tokenNotExpired} from "../../../security/TokenHelper";
import {Theme} from "../../../DOM/theme";
import {Organisation} from "../../../DOM/organisation";
import {RouteParams} from "angular2/router";
import {User} from "../../../DOM/users/user";
import {UserService} from "../../../service/userService";
import {Card} from "../../../DOM/card";
import {CardService} from "../../../service/cardService";
import {SubTheme} from "../../../DOM/subTheme";
import {SubThemeService} from "../../../service/subThemeService";


@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'subThemes-details',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/subThemes/subThemeDetail.html',
})


export class SubThemeDetailComponent implements OnInit {
    public subTheme:SubTheme=SubTheme.createEmpty();
    private subThemeId:number;
    private themeId:number;
    private subThemeCards:Card[] = [];
    private subThemeService:SubThemeService;
    private router:Router;
    private cardService: CardService;
    private user:User = User.createEmpty();
    private userService:UserService;

    constructor( router:Router, userService:UserService,
                routeParams:RouteParams, cardService:CardService, subThemeService:SubThemeService) {
        this.userService = userService;
        this.router = router;
        this.subThemeId = +routeParams.params["id"];
        this.cardService = cardService;
        this.subThemeService = subThemeService;
    }
    ngOnInit() {
        this.subThemeService.getSubTheme(this.subThemeId).subscribe(subTheme => {
            this.subTheme = subTheme;
            this.themeId=this.subTheme.themeId;
        });

        this.subThemeService.getSubThemeCards(this.subThemeId).subscribe(cards => {
            this.subThemeCards = cards;
            console.log(cards.length);
        });

        this.userService.getCurrentUser().subscribe(
            (data) => { this.user = data; },
            (error) => { console.log(error) }
        );

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
        } else {
            return "./app/resources/noimgplaceholder.png";
        }
    }
}
