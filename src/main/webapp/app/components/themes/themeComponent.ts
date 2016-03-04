import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/themeComponent.html',
    inputs: ['themes']
})

export class ThemeComponent  implements OnInit {
    public themes:Theme[] = [];

    constructor(private _themeService:ThemeService, private _router:Router) {
    }

    ngOnInit() {
        this._themeService.getUserThemes().subscribe((themes:Theme[])=> this.themes = themes);

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

    private rotateCard(){
        var card = $('.btn-simple').closest('.themeCard-container');
        console.log(card);
        if(card.hasClass('hover')){
            card.removeClass('hover');
        } else {
            card.addClass('hover');
        }
    }
}