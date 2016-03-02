/**
 * Created by Jordan on 29/02/2016.
 */
import {Component, OnInit} from 'angular2/core';
import {Router, CanActivate} from 'angular2/router';
import {tokenNotExpired} from "../../security/TokenHelper";
import {ThemeService} from "../../service/themeService";
import {Theme} from "../../DOM/theme";
import {OrganisationService} from "../../service/organisationService";
import {Organisation} from "../../DOM/organisation";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-theme',
    template: `
    <header>
        <div class="container clearfix">
            <h3><span class="glyphicon glyphicon-plus-sign"></span> Add Theme</h3>
        </div>
    </header>
    <div class="container main">
        <form  class="col-lg-offset-2 col-lg-8" method="post" role="form">

                <div class="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter theme name" class="form-control" [(ngModel)]="theme.themeName">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Enter Description" class="form-control" [(ngModel)]="theme.description">
                </div>
                <div class="form-group">
                <label>Organisation</label>
                    <select class="form-control" (change)="selectOrganisation($event)">
                        <option class="form-control" *ngFor="#organisation of currentOrganisations" value="{{organisation.organisationName}}">{{organisation.organisationName}}</option>
                    </select>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-lg btn-wide btn-primary" (click)="onSubmit()">Add</button>
                </div>
        </form>
    </div>
    `
})

export class AddThemeComponent implements OnInit {
    private theme: Theme = Theme.createEmpty();
    private themeService: ThemeService;
    private organisationService: OrganisationService;
    private currentOrganisations: Organisation[];
    private router: Router;
    private file: File = null;

    constructor(themeService: ThemeService, router: Router,orgService: OrganisationService) {
        this.themeService = themeService;
        this.router = router;
        this.organisationService = orgService;
    }

    ngOnInit() {
        this.organisationService.getAllOrganisations().subscribe((orgs:Organisation[])=> this.currentOrganisations= orgs);
    }

    onFileChange($event){
        this.file = $event.target.files[0];
    }

    onSubmit() {
        this.themeService.createTheme(this.theme).subscribe(res => {
            console.log(res.text());
            this.router.navigate(['/Themes']);
        }, error => {
            //todo change error display
            this.file = null;
            alert("something went wrong");
        });
    }

    selectOrganisation($event) {
        //alert($event.srcElement.value);
        var organisation = this.currentOrganisations.find(org => org.organisationName===$event.srcElement.value);
        this.theme.organisation=organisation;
        console.log(organisation);
    }
}