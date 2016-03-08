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
    private cards: Card[] = []
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
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });

    }

    calculateWidthCentre(){
        var width = document.getElementById("circlesvg").clientWidth;
        return width/2;
    }

    calculateHeightCentre(){
        var height= document.getElementById("circlesvg").clientHeight;
        return height/2;
    }

    private setImgBg(url:string):string{
        var style;
        if (url) {
            if (url.indexOf("http://") > -1) {
                style= "background: url(" + url + ") no-repeat; max-width: 100%";
            } else {
                style= "background: url(" + url.replace(/"/g, "") + ") no-repeat; max-width: 100%";
            }
        }

        return style;
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

}