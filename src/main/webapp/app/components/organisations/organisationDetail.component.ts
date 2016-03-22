import {Component, OnInit} from 'angular2/core'
import {Organisation} from "../../DOM/organisation";
import {OrganisationService} from "../../service/organisationService";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {tokenNotExpired} from "../../security/TokenHelper";
import {User} from "../../DOM/users/user";
import {UserService} from "../../service/userService";
import {Theme} from "../../DOM/theme";
import {CardService} from "../../service/cardService";
import {Card} from "../../DOM/card";
import {ThemeService} from "../../service/themeService";
import {SubThemeService} from "../../service/subThemeService";
import {SubTheme} from "../../DOM/subTheme";

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
    private themes:Theme[] = [];
    private themeService:ThemeService;
    private themeId:number;
    private theme:Theme = Theme.createEmpty();
    private orgId:number;

    private cards:Card[] = [];
    private card:Card = Card.createEmpty();
    private cardService:CardService;

    private subThemeService:SubThemeService;
    private subTheme:SubTheme = SubTheme.createEmpty();
    private subThemes:SubTheme[] = [];

    private newMember:string = "";
    private newOrganiser:string = "";

    private user:User = User.createEmpty();
    private userService:UserService;

    private file:File = null;

    constructor(orgService:OrganisationService, routeParams:RouteParams, subThemeService:SubThemeService, themeService:ThemeService, cardService:CardService, userService:UserService, private router:Router) {
        this.organisationService = orgService;
        this.orgId = +routeParams.params["id"];
        this.userService = userService;
        this.cardService = cardService;
        this.themeService = themeService;
        this.subThemeService = subThemeService;
        this.organisation = orgService.getOrganisationById(this.orgId);
        this.themeId = this.organisation.themeId;
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
            for (var i = 0; i < themes.length; i++) {
                this.themeService.getThemeCards(themes[i].themeId).subscribe(cards => {
                    this.cards = cards;
                });
                this.themeService.getThemeSubThemes(themes[i].themeId).subscribe(subThemes => {
                    this.subThemes = subThemes;
                });
            }
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });


    }

    /*
     ----------------------- ADD USER ---------------------------------------
     */
    private showAddUser() {
        event.preventDefault();
        var self = event.target;
        $(self).toggleClass('hide-add');

        if ($(self).hasClass('hide-add')) {
            $('.add-user').closest('.row').slideUp(100);
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

    /*
     ----------------------- ADD ORGANISATION ---------------------------------------
     */
    private showAddOrg() {
        event.preventDefault();
        var self = event.target;
        $(self).toggleClass('hide-add');

        if ($(self).hasClass('hide-add')) {
            $('.add-org').closest('.row').slideUp(100);
        } else {
            $('.add-org').closest('.row').slideDown(100);
        }
    }

    private addOrganiser() {
        if (this.newOrganiser) {
            this.organisationService.addOrganiserToOrganisation(this.orgId, this.newOrganiser).subscribe(u => {
                this.organisers.push(u);
                if (this.members.find(user => user.username === u.username)) {
                    var index = this.members.indexOf(u);
                    this.members.splice(index, 1);
                }
                this.newOrganiser = "";
            });
        }
    }

    /*
     ------------------------- CARD COMPONENT ------------------------------------
     */

    onSubmit() {
        if (this.card.description) {
            this.card.themeId = this.themeId;
            this.cardService.createCard(this.card, this.file).subscribe(c => {
                this.card.description = null;
                this.file = null;
                this.cards.push(c);
            }, error => {
                this.file = null;
                console.log(error);
            });
        }
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
        var output = document.getElementById("cardimg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    onAddCard(themeId:number) {
        this.card.themeId = themeId;
        this.themeId = themeId;
    }

    /*
     --------------------- SUBTHEME COMPONENT ---------------------
     */
    onAddSubTheme(themeId:number) {
        this.subTheme.themeId = themeId;
        this.themeId = themeId;
    }

    onSubmitSubTheme() {
        if (this.subTheme.description) {
            this.subThemeService.createSubTheme(this.subTheme, this.file).subscribe(st => {

                this.theme.subThemes.push(st);
                this.subTheme.subThemeName = null;
                this.subTheme.description = null;
                this.file = null;

                var cardIds = [];
                var i = 0;
                $("input:checked").each(function () {
                    cardIds[i] = $(this).val();
                    console.log($(this).val());
                    console.log(cardIds[i]);
                    i++;
                });

                this.subThemeService.addCardsToSubTheme(cardIds, st.subThemeId).subscribe(subt => {
                    console.log(subt);
                });

            }, error => {
                this.file = null;
                console.log(error);
            });
        }
    }

    addCardsSubTheme() {
        var cardIds = Array<number>();
        var i = 0;
        $("input:checked").each(function () {
            cardIds[i++] = $(this).val();
            console.log($(this).val());
        });
        var newSubThemeId = this.theme.subThemes.length + 1;
        this.subThemeService.addCardsToSubTheme(cardIds, newSubThemeId).subscribe(subTheme => {
            this.subTheme = subTheme;
            console.log(newSubThemeId);
            /*   this.cards = subTheme.cards;*/

        }, e => {
            alert(e.text());
        });

    }

    onFileChangeSubTheme($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("subthemeImg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    /*
     ----------------------- GENERAL ---------------------------------------
     */
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
        } else {
            return "./app/resources/noimgplaceholder.png";
        }
    }

    private rotateCard($event) {
        var card = $event.target;
        var container = $(card).closest('.themeCard-container');
        console.log(container);
        if (container.hasClass('hover')) {
            container.removeClass('hover');
        } else {
            container.addClass('hover');
        }
    }
}
