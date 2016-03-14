import {Component, OnInit} from 'angular2/core'
import {tokenNotExpired} from "../../security/TokenHelper";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {SessionService} from "../../service/sessionService";
import {Card} from "../../DOM/card";
import {Session} from "../../DOM/circleSession/session";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Person} from "../../DOM/users/person";
import {CardService} from "../../service/cardService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'session-detail',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/sessions/sessionDetail.html',
})

export class SessionDetailComponent implements OnInit{
    private sessionService: SessionService;
    private router: Router;
    private session: Session = Session.createEmpty();
    private sessionId: number;
    private size: Array<number> = [];
    private cards: Card[] = [];
    private users: User[] = [];
    private user: User = User.createEmpty();
    private userService: UserService;
    private cardService: CardService;
    private card:Card = Card.createEmpty();
    private file:File = null;

    private cardsOnCircle: Card[] = [];


    constructor(sesService: SessionService, userService:UserService, cardService:CardService, router: Router, routeParams: RouteParams){
        this.sessionService = sesService;
        this.router = router;
        this.sessionId = +routeParams.params["id"];
        this.userService = userService;
        this.cardService = cardService;
    }

    ngOnInit(){
        this.sessionService.getSessionById(this.sessionId).subscribe(s => {
            this.session = s;
            var j = s.size;
            for(var i = 0; i < s.size; i++){
                this.size[i] = --j;
            }
            this.cards = s.cards;
            this.users = s.users;
        }, e => {
            this.router.navigate(["/LoggedInHome"])
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });

    }

    getPosition(i){
        var c = this.cards[i];
        var position = this.session.size - 1 - c.position;

        var id = "#" + i;
        var el = $(document).find($(id));
        var elWidthPx = $(el).css("width");
        var elWidth = parseInt(elWidthPx, 10);
        var elHeightPx = $(el).css("height");
        var elHeight = parseInt(elHeightPx, 10);

        var circle = document.getElementById("circle-"+position);
        var radius = Number($(circle).attr("r"));

        var rotationDegree = 360/(this.cards.length);
        var step = (2*Math.PI)/this.cards.length;
        var middleWidth = this.calculateWidthCentre();
        var middleHeight = this.calculateHeightCentre();

        var x = Math.round(middleWidth + radius * Math.cos(step*i) - elWidth / 2);
        var y = Math.round(middleHeight + radius * Math.sin(step*i) - elHeight / 2);

        return "top:" + y + "px; left: " + x + "px; transform: rotate(" + (90+(rotationDegree*i)) + "deg)";
    }

    changePosition(i){
        var card = this.cards[i];
        var id = "#" + i;
        var el = $(document).find($(id));
        card.position = card.position + 1;
        if(card.position < (this.session.size-1)) {
            $(el).load("index.php");
        } else if(card.position == (this.session.size-1)){
            $(document).find("#card-element-winner").text(card.description);
            var img = $(document).find("#card-img-winner");
            img.attr("src", this.getImageSrc(card.imageURL));
            var popup = $(document).find("#winner-popup");
            $(popup).css("visibility", "visible");
        }
    }

    calculateWidthCentre(){
        var width = document.getElementById("circlesvg").getBoundingClientRect().width;
        return width/2;
    }

    calculateHeightCentre(){
        var height= document.getElementById("circlesvg").getBoundingClientRect().height;
        return height/2;
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

    /*
    ----------------------------------- ADD CARD ----------------------------------------
     */

    onAddCard(){
        this.card.themeId = +this.session.theme.themeId;
        this.cardService.createCard(this.card, this.file).subscribe(res => {
            /*var popup = document.getElementById("popup-addCard");
            $(popup).css("visibility", "hidden");*/
            this.file = null;
            this.session.theme.cards.push(res);
        })
    }

    onFileChange($event){
        this.file = $event.target.files[0];
    }

    /*
    ----------------------------------- CARD SELECTION ----------------------------------
     */

    onSelectCard($event){
        this.countChecked();
    }

    countChecked() {
        var count = $("input:checked").length;
        if(count >= this.session.maxCards){
            $("input:checkbox:not(:checked)").prop('disabled', true);
        } else {
            $("input:checkbox:not(:checked)").prop('disabled', false);
        }
    }

    onChooseCards() {
        var count = $("input:checked").length;
        if(count >= this.session.minCards) {
            var cardIds = Array<number>();
            var i = 0;
            $("input:checked").each(function() {
                cardIds[i++] = $(this).val();
                console.log($(this).val());
            });
            this.sessionService.addCards(cardIds, this.sessionId).subscribe(ses => {
                this.session = ses;
                this.cards = ses.cards;
                this.users = ses.users;
                this.session.chosenCards = true;

            }, e => {
                console.log(e.text());
            });
        }
    }

    /*
     ------------------------- CARD DESCRIPTION SLIDE-OVER -------------------------
     */

    showFullDescription(i){
        var id= "#" + i;
        var cardid = "#desc-"+i;
        var arrowid = "#arrow-" + i;
        var description = $(document).find($(id));
        var carddescription = $(document).find($(cardid));
        var arrow = $(document). find($(arrowid));
        description.css("display", "inherit");
        arrow.css("display", "inherit");
        carddescription.css("display", "none");

    }

    hideFullDescription(i){
        var id= "#" + i;
        var cardid = "#desc-"+i;
        var arrowid = "#arrow-" + i;
        var description = $(document).find($(id));
        var carddescription = $(document).find($(cardid));
        var arrow = $(document). find($(arrowid));
        description.css("display", "none");
        arrow.css("display", "none");
        carddescription.css("display", "");
    }
}
