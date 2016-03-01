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
        <p>{{organisation.organisationName}}</p>
        <p>{{organisation.address}}</p>
        <img [src]="getImageSrc(organisation.logoUrl)">
        <p>organisers</p>
        <ul>
          <li *ngFor="#organiser of organisers">
            {{ organiser.username }}
          </li>
        </ul>
        <p>members</p>
        <ul>
          <li *ngFor="#member of members">
            {{ member.username }}
          </li>
        </ul>
        <div *ngIf="organisation.organiser">
            <input type="text" [(ngModel)]="newMember">
            <button type="button" (click)="addMember()">Add member</button>
        </div>
    `
})

export class OrganisationDetailComponent implements OnInit{
    private organisationService: OrganisationService;
    private organisation: Organisation = Organisation.createEmpty();
    private organisers: User[] = [];
    private members: User[] = [];
    private orgId: number;
    private newMember: string;

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

    private addMember() {
        this.organisationService.addMemberToOrganisation(this.orgId, this.newMember).subscribe(u => {
            this.members.push(u);
            console.log("member added");
        })
    }
}
