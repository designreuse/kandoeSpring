import {Component, OnInit} from 'angular2/core';
import {tokenNotExpired} from "../../../security/TokenHelper";
import {SubThemeService} from "../../../service/subThemeService";
import {SubTheme} from "../../../DOM/subTheme";


import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'subThemes-details',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/subThemes/subThemeDetails.html',
})


export class SubThemeDetailComponent implements OnInit {

}
