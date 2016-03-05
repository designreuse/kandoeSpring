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
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/addTheme.html',
})

export class AddThemeComponent implements OnInit {
    private theme: Theme = Theme.createEmpty();
    private themeService: ThemeService;
    private organisationService: OrganisationService;
    private currentOrganisations: Organisation[];
    private router: Router;
    private file: File = null;
    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(themeService: ThemeService, router: Router,orgService: OrganisationService,userService:UserService) {
        this.themeService = themeService;
        this.router = router;
        this.organisationService = orgService;
        this.userService=userService;
    }

    ngOnInit() {
        this.organisationService.getUserOrganisations().subscribe((orgs:Organisation[])=> {
            this.currentOrganisations= orgs;
            this.theme.organisation = orgs[0];
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    onFileChange($event){
        this.file = $event.target.files[0];
    }

    onSubmit() {
        this.themeService.createTheme(this.theme).subscribe(res => {
            this.router.navigate(['/Themes']);
        }, error => {
            //todo change error display
            this.file = null;
            alert("something went wrong");
        });
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    selectOrganisation($event) {
        var organisation = this.currentOrganisations.find(org => org.organisationName===$event.target.value);
        this.theme.organisation=organisation;
    }


    private getImageSrc(url:string):string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}