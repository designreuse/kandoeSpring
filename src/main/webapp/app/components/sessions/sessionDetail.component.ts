import {Component, OnInit} from 'angular2/core'
import {tokenNotExpired} from "../../security/TokenHelper";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {SessionService} from "../../service/sessionService";
import {Card} from "../../DOM/card";
import {Session} from "../../DOM/circleSession/session";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Person} from "../../DOM/users/person";



@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'session-detail',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/sessions/sessionDetail.html',
})

export class SessionDetailComponent implements OnInit{
    private sessionService: SessionService;
    private router: Router;
    private session: Session;
    private sessionId: number;
    private size: Array<number> = [];
    private cards: Card[] = [];
    private users: User[] = [];
    private user: User = User.createEmpty();
    private userService: UserService;


    constructor(sesService: SessionService, private _userService:UserService, router: Router, routeParams: RouteParams){
        this.sessionService = sesService;
        this.router = router;
        this.sessionId = +routeParams.params["id"];
        this.userService=_userService;
    }

    ngOnInit(){
        this.sessionService.getSessionById(this.sessionId).subscribe(s => {
            console.log(JSON.stringify(s));
            this.session = s;
             var j = s.size;
            for(var i = 0; i < s.size; i++){
                this.size[i] = j-1;
                j = j-1;
            }
            this.cards = s.cards;
            this.users = s.users;
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
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