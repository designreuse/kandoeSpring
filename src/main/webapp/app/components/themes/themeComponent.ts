import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    template: `
        <div class="container">
        <div class="input-append">
            <input class="span2 search-query" id="input-search" type="search" placeholder="Search organisations..." >
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" id ="filter" data-toggle="dropdown">
                <span class="glyphicon glyphicon-filter"></span>
                <span class="caret"></span>Filter</button>
                <ul class="dropdown-menu">
                    <li><a href="#">Name</a></li>
                    <li><a href="#">Description</a></li>
                </ul>
            </div>
        </div>
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
				<ul class="searchable-container">
				    <div *ngFor="#theme of themes" class="event-list col-1-4">
					<li class="items">
					    <div class="id"><p>{{theme.themeId}}</p></div>
						<div class="info">
							<h2 class="title">{{theme.themeName}}</h2>
							<p class="desc">{{theme.description}}</p>
						</div>
						<div class="social">
							<ul>
								<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
								<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>
								<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>
							</ul>
						</div>
					</li>
					</div>
				</ul>
			</div>
		</div>

    </div>
    `,

    inputs: ['themes']
})

export class ThemeComponent  implements OnInit {
    public themes:Theme[] = [];

    constructor(private _themeService:ThemeService, private _router:Router) {
    }

    ngOnInit() {
        this._themeService.getAllThemes().subscribe((themes:Theme[])=> this.themes = themes);
        console.log(this.themes.length);
    }
}