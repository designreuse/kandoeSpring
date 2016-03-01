/**
 * Created by michaelkees on 12/02/16.
 */
import {Component, OnInit} from 'angular2/core'
import {Router, CanActivate} from 'angular2/router'
import {Organisation} from "../../DOM/organisation";
import {Service} from "../../service/service";
import {tokenNotExpired} from "../../security/TokenHelper";
import {OrganisationService} from "../../service/organisationService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'organisations',
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
                    <li><a href="#">Id</a></li>
                    <li><a href="#">Address</a></li>
                </ul>
            </div>
        </div>
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
				<ul class="searchable-container">
				    <div *ngFor="#organisation of organisations; #i = index" class="event-list col-1-4">
                        <!--<p>OrganisationID : {{organisation.organisationId}}</p>-->
                        <li class="items">
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
                        </li>
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
}