import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    template: `
        <div class="container">
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
				    <div class="event-list col-1-4">
					    <div class="id"><p>{{theme.themeId}}</p></div>
						<div class="info">
							<h2 class="title">{{theme.themeName}}</h2>
							<p class="desc">{{theme.description}}</p>
							<p> IconURL: {{theme.iconURL}}</p>
							<p>Organisation name: {{org.organisationName}}</p>
						</div>
				    </div>
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
}