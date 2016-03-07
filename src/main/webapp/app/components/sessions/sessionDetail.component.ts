import {Component, OnInit} from 'angular2/core'
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {User} from "../../DOM/users/user";
import {UserService} from "../../service/userService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: "session-detail",
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
        <h1>test</h1>
    `
})

export class SessionDetailComponent {

}