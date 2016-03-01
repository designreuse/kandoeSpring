import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {Router, CanActivate, RouteParams} from 'angular2/router';
import {tokenNotExpired} from "../../security/TokenHelper";
import {User} from "../../DOM/users/user";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: "organisation-detail",
    template: `
    <header>
        <div class="container clearfix">
            <h2><span class="glyphicon glyphicon-book"></span> {{organisation.organisationName}}</h2>
        </div>
    </header>
    <div class="container main">
            <div class="center-container col-lg-offset-2 col-lg-8">
                <img class="img-responsive img-thumbnail" id="org-logo" [src]="getImageSrc(organisation.logoUrl)">
            </div>
            <div class="row">
                <div class="well well-lg col-lg-offset-2 col-lg-4">
                    <p>{{organisation.address}}</p>
                </div>
                <div class="well well-lg col-lg-4">
                    <p>members</p>
                    <ul>
                      <li *ngFor="#member of members">
                        {{ member.username }}
                      </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well well-lg col-lg-offset-2 col-lg-8">
                    <p>organisers</p>
                    <ul>
                      <li *ngFor="#organiser of organisers">
                        {{ organiser.username }}
                      </li>
                    </ul>
                </div>
           </div>
    </div>
    `
})

export class OrganisationDetailComponent implements OnInit{
    private organisationService: OrganisationService;
    private organisation: Organisation = Organisation.createEmpty();
    private organisers: User[] = [];
    private members: User[] = [];
    private orgId: number;

    constructor(orgService: OrganisationService, routeParams: RouteParams){
        this.organisationService = orgService;
        this.orgId = +routeParams.params["id"];
    }

    ngOnInit() {
        this.organisationService.getOrganisationById(this.orgId).subscribe(org => {
            this.organisation = org;
            this.organisation.logoUrl = org.logoUrl;
        });
        this.organisationService.getOrganisationOrganisers(this.orgId).subscribe(users => {
            this.organisers = users;
        });
        this.organisationService.getOrganisationMembers(this.orgId).subscribe(users => {
            this.members = users;
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
