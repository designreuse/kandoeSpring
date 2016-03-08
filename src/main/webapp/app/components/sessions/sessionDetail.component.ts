import {Component, OnInit} from 'angular2/core'
import {tokenNotExpired} from "../../security/TokenHelper";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {SessionService} from "../../service/sessionService";
import {Card} from "../../DOM/card";
import {Session} from "../../DOM/circleSession/session";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'session-detail',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `

    `
})

export class SessionDetailComponent implements OnInit{
    private sessionService: SessionService;
    private router: Router;
    private session: Session;
    private sessionId: number;

    constructor(sesService: SessionService, router: Router, routeParams: RouteParams){
        this.sessionService = sesService;
        this.router = router;
        this.sessionId = +routeParams.params["id"];
    }

    ngOnInit(){
        this.sessionService.getSessionById(this.sessionId).subscribe(s => {
            console.log(JSON.stringify(s));
            this.session = s;
        });
    }
}