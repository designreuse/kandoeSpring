import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {Router, CanActivate} from 'angular2/router';
import {tokenNotExpired} from "../../security/TokenHelper";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-organisation',
    template: `
    <header>
        <div class="container clearfix">
            <h3><span class="glyphicon glyphicon-plus-sign"></span> Add new organisation</h3>
        </div>
    </header>
    <div class="container main">
        <form  class="col-lg-offset-2 col-lg-8" method="post" role="form">
            <div class="form-padadd-org">

                <div class="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter organisation name" class="form-control" [(ngModel)]="organisation.organisationName">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" class="form-control" [(ngModel)]="organisation.address">
                </div>
                <div class="form-group">
                    <label>Logo</label>
                    <input type="file" multiple="false" (change)="onFileChange($event)">
                </div>
                <div class="items">
                    <div class="item">
                        <div class="id"><p>1</p></div>
                        <img alt="logo" [src]="getImageSrc(organisation.logoUrl, organisation.organisationId)" />
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
                    </div>
                </div>
                <button type="button" class="btn btn-lg btn-info glyphicon glyphicon-plus" (click)="onSubmit()"> Add</button>
            </div>
        </form>
    </div>
    `
})

export class AddOrganisationComponent {
    private organisation:Organisation = Organisation.createEmpty();
    private organisationService:OrganisationService;
    private router:Router;
    private file:File = null;

    constructor(orgService:OrganisationService, router:Router) {
        this.organisationService = orgService;
        this.router = router;
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
    }

    onSubmit() {
        this.organisationService.createOrganisation(this.organisation, this.file).subscribe(res => {
            this.router.navigate(['/Organisations']);
            this.file = null;
        }, error => {
            //todo change error display
            this.file = null;
            alert(error.text());
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