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
    private themeService : ThemeService;
    private router:Router;
    private cardService: CardService;
    private user:User = User.createEmpty();
    private userService:UserService;
    private card:Card = Card.createEmpty();
    private themeCards:Card[] = [];
    private file:File = null;
    private csvFile:File = null;
    private theme:Theme = null;

    constructor( router:Router, userService:UserService,
                routeParams:RouteParams, cardService:CardService, subThemeService:SubThemeService,themeService:ThemeService) {
        this.userService = userService;
        this.router = router;
        this.subThemeId = +routeParams.params["id"];
        this.cardService = cardService;
        this.subThemeService = subThemeService;
        this.themeService = themeService;
    }

    ngOnInit() {
        this.subThemeService.getSubTheme(this.subThemeId).subscribe(subTheme => {
            this.subTheme = subTheme;
            this.themeId=this.subTheme.themeId;
            this.themeService.getThemeCards(this.themeId).subscribe(cards => {
                this.themeCards = cards;
                console.log("themeCards have been added");
            });
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
        } else {
            return "./app/resources/noimgplaceholder.png";
        }
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
        var output = document.getElementById("cardimg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    onCSVFileChange($event) {
        this.csvFile = $event.target.files[0];
        var el = $event.target;
        console.log(el);
        $(el).closest(".btn-file").css({
            color: "#333",
            backgroundColor: "#e6e6e6",
            borderColor: "#adadad"
        });
    }

    onSubmitCSV() {
        if (!this.csvFile) return;
        console.log("File type: " + this.csvFile.type);
        this.cardService.createCardFromCSV(this.subThemeId, this.csvFile).subscribe(
            (data) => {
                for (var c in data.json()) {
                    console.log(c);
                    this.subThemeCards.push(c);
                }
            },
            (error) => {
                console.log("Error uploading csv: " + error);
            },
            () => {
                console.log("gefefeffv")
            }
        );
    }

    onSubmit() {
        console.log("adding card");
        if (this.card.description) {
            this.card.themeId = this.themeId;
            this.card.subThemeId = this.subThemeId;
            this.cardService.createCardForSubTheme(this.card, this.file).subscribe(c => {
                this.card.description = null;
                this.file = null;
                this.subThemeCards.push(c);
            }, error => {
                this.file = null;
                console.log(error);
            });
        }
    }

    selectCardsFromTheme(){
        var cardIds = [];
        var i = 0;
        $("input:checked").each(function () {
            cardIds[i] = $(this).val();
            i++;
        });

        for(var i=0;i<cardIds.length;i++){
            this.cardService.getCardById(cardIds[i]).subscribe(card => {
                card.subThemeId = this.subThemeId;
                console.log("incoming card subThemeId: " + card.subThemeId);
                this.cardService.createCardForSubTheme(card).subscribe(c => {
                    this.subThemeCards.push(c);
                });
            });
        }

        console.log("number of selected cards: " + cardIds.length);
    }
}
