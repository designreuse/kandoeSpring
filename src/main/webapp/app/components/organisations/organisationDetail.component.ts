import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {User} from "../../DOM/users/user";
import {UserService} from "../../service/userService";
import {Theme} from "../../DOM/theme";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: "organisation-detail",
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/organisations/organisationDetail.html'
})

export class OrganisationDetailComponent implements OnInit {
    private organisationService:OrganisationService;
    private organisation:Organisation = Organisation.createEmpty();
    private organisers:User[] = [];
    private members:User[] = [];
    private themes: Theme[] = [];
    private orgId:number;

    private newMember:string = "";
    private newOrganiser:string = "";

    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(orgService:OrganisationService, routeParams:RouteParams, userService:UserService, private router: Router) {
        this.organisationService = orgService;
        this.orgId = +routeParams.params["id"];
        this.userService=userService;
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
        this.organisationService.getOrganisationThemes(this.orgId).subscribe(themes => {
            this.themes = themes;
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    private showAddUser() {
        $("#add-button").toggleClass('hide-add');
        if ($(this).hasClass('hide-add')) {
            $('.add-user').closest('.row').css("display", "none");
        } else {
            $('.add-user').closest('.row').slideDown(100);
        }
    }

    private addMember() {
        if (this.newMember) {
            this.organisationService.addMemberToOrganisation(this.orgId, this.newMember).subscribe(u => {
                this.members.push(u);
                this.newMember = "";
            })
        }
    }

    private showAddOrganiser() {
        $("#add-button-org").toggleClass('hide-add');
        if ($(this).hasClass('hide-add')) {
            $('.add-organiser').closest('.row').css("display", "none");
        } else {
            $('.add-organiser').closest('.row').slideDown(100);
        }
    }

    private addOrganiser() {
        if (this.newOrganiser) {
            this.organisationService.addOrganiserToOrganisation(this.orgId, this.newOrganiser).subscribe(u => {
                this.organisers.push(u);
                if(this.members.find(user => user.username === u.username)){
                    var index = this.members.indexOf(u);
                    this.members.splice(index, 1);
                }
                this.newOrganiser = "";
            });
        }
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
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
