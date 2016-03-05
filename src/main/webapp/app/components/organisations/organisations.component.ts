/**
 * Created by michaelkees on 12/02/16.
 */
import {Component, OnInit} from 'angular2/core'
import {Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {Organisation} from "../../DOM/organisation";
import {tokenNotExpired} from "../../security/TokenHelper";
import {OrganisationService} from "../../service/organisationService";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Person} from "../../DOM/users/person";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'organisations',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/organisations/organisations.html',
    inputs: ['organisations']
})

export class OrganisationsComponent implements OnInit {
    public organisations:Organisation[] = [];
    private user: User = User.createEmpty();
    private userService: UserService;

    constructor(private _organisationService:OrganisationService, private _userService:UserService, private _router:Router) {
        this.userService=_userService;
    }

    ngOnInit() {
        this._organisationService.getUserOrganisations().subscribe((organisations:Organisation[])=> this.organisations = organisations);
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
             $("#input-search").on("keyup", function () {
            var rex = new RegExp($(this).val(), "i");
            $(".searchable-container .items").hide();
            $(".searchable-container .items").filter(function () {
                return rex.test($(this).text());
            }).show();
        });
    }

    private getImageSrc(url:string): string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
    logout() {
        localStorage.removeItem("id_token");
        this._router.navigate(['/Home']);
    }
    sortName() {
        $(".filter-Name").addClass("active");
        $(".filter-ID").removeClass("active");
        $(".filter-Desc").removeClass("active");

        var items = $("#sort-list li.items").get();

        if ($(".filter-Name").hasClass("filter-A")) {
            items.sort(function (a, b) {
                var keyA = $(a).find("h2.title").text();
                var keyB = $(b).find("h2.title").text();

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-Name").removeClass("filter-A").addClass("filter-Z");
            $(".filter-Name").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet").addClass("glyphicon-sort-by-alphabet-alt");
        } else if ($(".filter-Name").hasClass("filter-Z")) {
            items.sort(function (a, b) {
                var keyA = $(a).find("h2.title").text();
                var keyB = $(b).find("h2.title").text();

                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-Name").removeClass("filter-Z").addClass("filter-A");
            $(".filter-Name").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet-alt").addClass("glyphicon-sort-by-alphabet");
        }
    }

    sortId() {
        $(".filter-Name").removeClass("active");
        $(".filter-ID").addClass("active");
        $(".filter-Desc").removeClass("active");

        var items = $("#sort-list li.items").get();

        if ($(".filter-ID").hasClass("filter-A")) {
            items.sort(function (a, b) {
                var keyA = $(a).find(".id").text();
                var keyB = $(b).find(".id").text();

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-ID").removeClass("filter-A").addClass("filter-Z");
            $(".filter-ID").find(".glyphicon").removeClass("glyphicon-sort-by-order").addClass("glyphicon-sort-by-order-alt");
        } else if ($(".filter-ID").hasClass("filter-Z")) {
            items.sort(function (a, b) {
                var keyA = $(a).find(".id").text();
                var keyB = $(b).find(".id").text();

                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-ID").removeClass("filter-Z").addClass("filter-A");
            $(".filter-ID").find(".glyphicon").removeClass("glyphicon-sort-by-order-alt").addClass("glyphicon-sort-by-order");
        }
    }

    sortDesc() {
        $(".filter-Name").removeClass("active");
        $(".filter-ID").removeClass("active");
        $(".filter-Desc").addClass("active");

        var items = $("#sort-list li.items").get();

        if ($(".filter-Desc").hasClass("filter-A")) {
            items.sort(function (a, b) {
                var keyA = $(a).find("p.desc").text();
                var keyB = $(b).find("p.desc").text();

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-Desc").removeClass("filter-A").addClass("filter-Z");
            $(".filter-Desc").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet").addClass("glyphicon-sort-by-alphabet-alt");
        } else if ($(".filter-Desc").hasClass("filter-Z")) {
            items.sort(function (a, b) {
                var keyA = $(a).find("p.desc").text();
                var keyB = $(b).find("p.desc").text();

                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            var ul = $("#sort-list");
            $.each(items, function (i, li) {
                ul.append(li);
            });

            $(".filter-Desc").removeClass("filter-Z").addClass("filter-A");
            $(".filter-Desc").find(".glyphicon").removeClass("glyphicon-sort-by-alphabet-alt").addClass("glyphicon-sort-by-alphabet");
        }
    }
}