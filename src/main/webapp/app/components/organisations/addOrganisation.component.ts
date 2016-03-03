import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-organisation',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/organisations/addOrganisation.html'
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

        var output = document.getElementById("imgOut");
        output.src = URL.createObjectURL($event.target.files[0]);
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
}
