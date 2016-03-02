import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'Theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
    <header>
        <div class="container clearfix" id="org-header">
            <h3>Themes</h3>
            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                <form class="form-search">
                    <div class="input-group">
                        <input id="input-search" class="form-control border-radius"  placeholder="Search organisations..." >
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-default filter filter-ID filter-A" (click)="sortId()">
                            <span class="glyphicon glyphicon-sort-by-order"> ID</span></button>
                            <button type="button" class="btn btn-default filter filter-Name filter-A" (click)="sortName()">
                            <span class="glyphicon glyphicon-sort-by-alphabet"> Name</span></button>
                            <button type="button" class="btn btn-default filter filter-Desc filter-A" (click)="sortDesc()">
                            <span class="glyphicon glyphicon-sort-by-alphabet"> Description</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </header>
    <div class="container main" id="org-list">
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
				<ul class="searchable-container">
				    <div *ngFor="#theme of themes" class="organisation-list col-1-4" id="sort-list">
					<li class="items">
					<a [routerLink]="['/ThemeDetail', {id:theme.themeId}]">
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
						</a>
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
    }
}