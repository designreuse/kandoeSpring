import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate, RouteParams} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";
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

export class ThemeComponent implements OnInit {
    public themes:Theme[] = [];
    private user:User = User.createEmpty();
    private router:Router;
    private userService:UserService;
    private cardService:CardService;
    private file:File = null;
    private cards:Card[] = [];
    private card:Card = Card.createEmpty();
    private themeId:number;

    constructor(private _themeService:ThemeService, private router:Router, private _userService:UserService,
                cardService:CardService) {
        this.userService = _userService;
        this.router=router;
        this.cardService = cardService;
    }



    ngOnInit() {
        this._themeService.getUserThemes().subscribe((themes:Theme[])=> {
            this.themes = themes;
        });
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

    onFileChange($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("cardimg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    private rotateCard($event){
        var card = $event.target;
        var container = $(card).closest('.themeCard-container');
        console.log(container);
        if(container.hasClass('hover')){
            container.removeClass('hover');
        } else {
            container.addClass('hover');
        }
    }

    giveId(id:number) {
        this.themeId = id;
    }

    onSubmit() {
        this.card.themeId = +this.themeId;
        this.cardService.createCard(this.card, this.file).subscribe(res => {
            var popup = document.getElementById("popup-addCard");
            $(popup).css("visibility", "hidden");
            this.router.navigate(['/Themes']);
            document.location.reload();
            this.file = null;
        }, error => {
            //todo change error display
             this.file = null;
            alert(error.text());
        });
    }
}