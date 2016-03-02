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
            <h3><span class="glyphicon glyphicon-book"> {{organisation.organisationName}}</span></h3>
        </div>
    </header>
    <div class="container main">
        <div class="center-container col-lg-offset-2 col-lg-8">
            <img class="img-responsive img-thumbnail" id="org-logo" [src]="getImageSrc(organisation.logoUrl)">
        </div>
        <div class="row">
            <div class="center-container col-lg-offset-2 col-lg-8">
                <h3>{{organisation.address}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-offset-2 col-lg-8">
                <div class="panel panel-default">
                    <div class="panel-heading c-list">
                        <h4 class="title">Organisers</h4>
                    </div>
                    <ul class="panel-body list-group org-list">
                        <div *ngFor="#organiser of organisers">
                          <li class="list-group-item">
                            <div class="col-xs-12 col-sm-3">
                                <img src="http://zblogged.com/wp-content/uploads/2015/11/c1.png" alt="profile picture" class="img-responsive img-circle" />
                            </div>
                            <div class="col-xs-12 col-sm-9">
                                <span class="username">{{ organiser.username }}</span>
                                <span class="pull-right email">{{organiser.email}}</span> <br/>
                                <span class="name">{{organiser.person.firstname}} {{organiser.person.lastname}}</span>
                            </div>
                            <div class="clearfix"></div>
                          </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-offset-2 col-lg-8">
                <div class="panel panel-default">
                    <div class="panel-heading c-list">
                        <h4 class="title">Members</h4>
                        <div class="pull-right c-controls" *ngIf="organisation.organiser">
                            <a class="hide-add" id="add-button" (click)="showAddUser()"><span class="glyphicon glyphicon-plus"></span></a>
                        </div>
                    </div>
                    <div class="row" style="display: none">
                        <div class="col-xs-12">
                            <div class="input-group add-user">
                                <input type="text" class="form-control">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button" (click)="addMember()"><i class="glyphicon glyphicon-plus-sign"></i> Add user</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul class="panel-body list-group member-list">
                        <div *ngFor="#member of members">
                          <li class="list-group-item">
                            <div class="col-xs-12 col-sm-3">
                                <img src="http://zblogged.com/wp-content/uploads/2015/11/c1.png" alt="profile picture" class="img-responsive img-circle" />
                            </div>
                            <div class="col-xs-12 col-sm-9">
                                <span class="username">{{ member.username }}</span>
                                <span class="pull-right email">{{member.email}}</span><br/>
                                <span class="name">{{member.person.firstname}} {{member.person.lastname}}</span>
                            </div>
                          </li>
                        </div>
                    </ul>
                </div>
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

    private showAddUser(){
        $("#add-button").toggleClass('hide-add');
        if ($(this).hasClass('hide-add')) {
            $('.add-user').closest('.row').css("display", "none");
        }else {
            $('.add-user').closest('.row').slideDown(100);
        }
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
            this.newMember = "";
        })
    }
}
