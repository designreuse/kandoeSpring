import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Theme} from "../../DOM/theme";
import {ThemeService} from "../../service/themeService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-organisation',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/organisations/addOrganisation.html'
})

export class AddOrganisationComponent implements OnInit{
    private organisation:Organisation = Organisation.createEmpty();
    private organisationService:OrganisationService;
    private router:Router;
    private file:File = null;
    private user: User = User.createEmpty();

    constructor(orgService:OrganisationService, private _userService:UserService, router:Router) {
        this.organisationService = orgService;
        this.router = router;
        this._userService=_userService;
    }

    ngOnInit() {
        this._userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });

    }

    onFileChange($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("imgOut");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    /*
     ----------------------- ADD ORGANISATION ---------------------------------------
     */

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

    /*
     ----------------------- GENERAL ---------------------------------------
     */

    logout() {
    localStorage.removeItem("id_token");
    this.router.navigate(['/Home']);
}

    private getImageSrc(url:string): string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        } else {
            return "./app/resources/noimgplaceholder.png";
        }
    }
}
