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
import {Card} from "../../DOM/card";
import {CardService} from "../../service/cardService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/themeDetailComponent.html',
    inputs: ['theme']
})

export class ThemeDetailComponent implements OnInit {
    public theme:Theme = Theme.createEmpty();
    private themeId: number;
    public org:Organisation=Organisation.createEmpty();
	private cards: Card[] = [];
    private newCard: Card = Card.createEmpty();
    private file: File = null;
    private cardService: CardService;

    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(private _themeService:ThemeService, private _router:Router, userService:UserService,
                routeParams: RouteParams, cardService: CardService) {
        this.userService = userService;
		this.themeId = +routeParams.params["id"];
        this.cardService = cardService;
    }

    ngOnInit() {
        this._themeService.getTheme(this.themeId).subscribe(theme => {
            this.theme = theme;
            this.org=this.theme.organisation;
        });
        this._themeService.getThemeCards(this.themeId).subscribe(cards => {
            this.cards = cards;
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    createCard() {
        this.newCard.themeId = this.themeId;
        this.cardService.createCard(this.newCard, this.file).subscribe(c => {
            console.log(c);
            this.file = null;
            this.cards.push(c);
        })
    }

    onFileChange($event){
        this.file = $event.target.files[0];
    }

    logout() {
        localStorage.removeItem("id_token");
        this._router.navigate(['/Home']);
    }

    getImageSrc(url: string): string {
        if(url){
            if(url.indexOf("http://") > -1){
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }

    removeTag(){
        $(".removeTag").closest(".tag").remove();
    }
}