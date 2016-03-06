import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";
import {RouteParams} from "angular2/router";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Card} from "../../DOM/card";
import {CardService} from "../../service/cardService";

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
    private cardService: CardService;
    private cards: Card[] = [];
    private themeId: number;

    constructor(private _themeService:ThemeService, private _router:Router, private _userService:UserService, cardService: CardService) {
        this.userService=_userService;
        this.cardService = cardService;
    }

    ngOnInit() {
        this._themeService.getUserThemes().subscribe((themes:Theme[])=> this.themes = themes);
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
        this._themeService.getThemeCards(this.themeId).subscribe(cards => {
            this.cards = cards;
        });
    }

    logout() {
        localStorage.removeItem("id_token");
        this._router.navigate(['/Home']);
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

    private rotateCard(){
        var card = $('.btn-simple').closest('.themeCard-container');
        console.log(card);
        if(card.hasClass('hover')){
            card.removeClass('hover');
        } else {
            card.addClass('hover');
        }
    }
}