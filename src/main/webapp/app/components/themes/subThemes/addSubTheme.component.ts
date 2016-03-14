import {Component, OnInit} from 'angular2/core';
import {tokenNotExpired} from "../../../security/TokenHelper";
import {SubThemeService} from "../../../service/subThemeService";
import {SubTheme} from "../../../DOM/subTheme"
import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-SubTheme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/subThemes/addSubTheme.html',
})


export class AddSubThemeComponent implements OnInit {
    private subTheme:SubTheme = SubTheme.createEmpty();
    private subThemeService:SubThemeService;
    private router:Router;
    private file:File = null;

    constructor(subThemeService:SubThemeService, router:Router) {
        this.subThemeService = subThemeService;
        this.router = router;
    }

}