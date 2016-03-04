/**
 * Created by Jordan on 29/02/2016.
 */
import {Component, OnInit} from 'angular2/core';
import {tokenNotExpired} from "../../security/TokenHelper";
import {ThemeService} from "../../service/themeService";
import {Theme} from "../../DOM/theme";
import {OrganisationService} from "../../service/organisationService";
import {Organisation} from "../../DOM/organisation";

import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/addThemeComponent.html',
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
        this.organisationService.getUserOrganisations().subscribe((orgs:Organisation[])=> this.currentOrganisations= orgs);
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
        var organisation = this.currentOrganisations.find(org => org.organisationName===$event.target.value);
        this.theme.organisation=organisation;
    }
}