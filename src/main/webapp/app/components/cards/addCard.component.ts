import {tokenNotExpired} from "../../security/TokenHelper";
import {Component, OnInit} from 'angular2/core'
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate, RouteParams} from "angular2/router";
import {Card} from "../../DOM/card";
import {CardService} from "../../service/cardService";
import {UserService} from "../../service/userService";
import {ThemeService} from "../../service/themeService";


@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-card',
    templateUrl: 'app/components/cards/addCard.html'
})

export class AddCardComponent implements OnInit{
    private card:Card = Card.createEmpty();
    private cardService:CardService;
    private router:Router;
    private file:File = null;
    private user:User = User.createEmpty();
    private userService:UserService;
    private theme:Theme = Theme.createEmpty();
    private themeService:ThemeService;
    private themeId: number;

    constructor(cardService:CardService, router:Router, userService:UserService, themeService:ThemeService, routeParams: RouteParams) {
         this.cardService = cardService;
        this.router = router;
        this.userService = userService;
        this.themeService = themeService;
        this.themeId = +routeParams.params["id"];
    }


    ngOnInit() {
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });

        this.themeService.getTheme(this.themeId).subscribe(theme=> {
            this.theme = theme;
        });
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    onFileChange($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("cardimg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    onSubmit() {
        this.card.themeId= this.themeId;
        this.cardService.createCard(this.card, this.file).subscribe(res => {
            this.router.navigate(['/Themes']);
            this.file = null;
        }, error => {
            //todo change error display
            this.file = null;
            alert(error.text());
        });
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

