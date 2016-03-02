/**
 * Created by michaelkees on 12/02/16.
 */
import {Component, OnInit} from 'angular2/core'
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {Organisation} from "../../DOM/organisation";
import {tokenNotExpired} from "../../security/TokenHelper";
import {OrganisationService} from "../../service/organisationService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'organisations',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
    <header>
        <div class="container clearfix" id="org-header">
            <h3>Organisations</h3>
            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                <form class="form-search">
                    <div class="input-group dropdown">
                        <input id="input-search" class="form-control"  placeholder="Search organisations..." >
                        <div class="btn-group input-group-btn" role="group">
                            <button type="button" class="btn btn-default dropdown-toggle" id ="filter" data-toggle="dropdown" >
                            <span class="glyphicon glyphicon-filter"></span>
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><span class="sort-option" (click)="sortNameAsc()">Name A-Z</span></li>
                                <li><span class="sort-option" (click)="sortNameDesc()">Name Z-A</span></li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </header>
    <div class="container main">
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-1 col-sm-10">
				<ul class="searchable-container">
				<div class="organisation-list col-1-4">
						<li>
						    <a [routerLink]="['/AddOrganisation']" >
                                <div class="id"><p>0</p></div>
                                <span class="add glyphicon glyphicon-plus-sign"></span>
                                <div class="info">
                                    <h2 class="title">Add an organisation</h2>
                                    <p class="desc">Create your own group, add people and themes, and link a session. Make sure you're in control!</p>
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

				    <div *ngFor="#organisation of organisations; #i = index" id="sort-list">

                        <li class="items">
                        <a [routerLink]="['/OrganisationDetail', {id:organisation.organisationId}]">
                            <div class="id"><p>{{i+1}}</p></div>
                            <img alt="logo" [src]="getImageSrc(organisation.logoUrl, organisations.organisationId)" />
                            <div class="info">
                                <h2 class="title">{{organisation.organisationName}}</h2>
                                <p class="desc">{{organisation.address}}</p>
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
					</div>
				</ul>

			</div>
		</div>

    </div>`,
    inputs: ['organisations']
})

export class OrganisationsComponent implements OnInit {
    public organisations:Organisation[] = [];

    constructor(private _organisationService:OrganisationService , private _router:Router) {
    }

    ngOnInit() {
        this._organisationService.getUserOrganisations().subscribe((organisations:Organisation[])=> this.organisations = organisations);

        $('#input-search').on('keyup', function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container .items').hide();
            $('.searchable-container .items').filter(function () {
                return rex.test($(this).text());
            }).show();
        });
    }

    private getImageSrc(url: string, id: number): string {
        if(url){
            if(url.indexOf("http://") > -1){
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }

    sortNameAsc(){
        var items = $('#sort-list li.items').get();
        items.sort(function(a,b){
            var keyA = $(a).find("h2.title").text();
            var keyB = $(b).find("h2.title").text();

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        var ul = $('#sort-list');
        $.each(items, function(i, li){
            ul.append(li);
        });
    }

    sortNameDesc(){

        var items = $('#sort-list li.items').get();
        items.sort(function(a,b){
            var keyA = $(a).find("h2.title").text();
            var keyB = $(b).find("h2.title").text();

            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        var ul = $('#sort-list');
        $.each(items, function(i, li){
            ul.append(li);
        });
    }

}