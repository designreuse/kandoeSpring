import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
    <header>
        <div class="container clearfix">
            <h3><span class="glyphicon glyphicon-bookmark">  {{theme.themeName}}</span></h3>
        </div>
    </header>
    <div class="container main">
        <div class="center-container col-lg-offset-2 col-lg-8">
            <img class="img-responsive img-thumbnail" id="org-logo" [src]="getImageSrc(theme.iconURL)">
        </div>
        <div class="row">
            <div class="center-container col-lg-offset-2 col-lg-8">
                <h3>{{theme.description}}</h3>
            </div>
        </div>
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
			<ol class="breadcrumb">
        <li><a [routerLink]="['/LoggedInHome']">Your Kandoe</a></li>
        <li><a [routerLink]="['/Themes']">Themes</a></li>
        <li class="active"> Theme detail</li>
    </ol>

			<h4>Organisation</h4>
			    <ul class="organisation-list">
                    <li>
                        <a [routerLink]="['/OrganisationDetail', {id:org.organisationId}]">
                        <div class="item">
                            <div class="id"><p>{{org.organisationId}}</p></div>
                            <img alt="logo" [src]="getImageSrc(org.logoUrl, org.organisationId)" />
                            <div class="info">
                                <h2 class="title">{{org.organisationName}}</h2>
                                <p class="desc">{{org.address}}</p>
                            </div>
                            </div>
                        </a>
                    </li>
               </ul>
			</div>
		</div>
    </div>
    `,

    inputs: ['theme']
})

export class ThemeDetailComponent implements OnInit {
    public theme:Theme = Theme.createEmpty();
    public org:Organisation=Organisation.createEmpty;
    constructor(private _themeService:ThemeService, private _router:Router) {
    }

    ngOnInit() {
        this._themeService.getTheme(1).subscribe(theme => {
            this.theme = theme;
            this.org=this.theme.organisation;
            console.log(this.theme);
        });
    }

    private getImageSrc(url: string): string {
        if(url){
            if(url.indexOf("http://") > -1){
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}