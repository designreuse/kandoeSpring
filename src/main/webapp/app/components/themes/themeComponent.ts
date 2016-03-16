import {Component, OnInit} from "angular2/core";
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate, RouteParams} from "angular2/router";
import {ThemeService} from "../../service/themeService";
import {tokenNotExpired} from "../../security/TokenHelper";
import {Theme} from "../../DOM/theme";
import {Organisation} from "../../DOM/organisation";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Card} from "../../DOM/card";
import {SubTheme} from "../../DOM/subTheme";
import {CardService} from "../../service/cardService";
import {SubThemeService} from "../../service/subThemeService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'theme',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/themes/themeComponent.html',
    inputs: ['themes']
})

export class ThemeComponent implements OnInit {
    public themes:Theme[] = [];
    private subTheme:SubTheme = SubTheme.createEmpty();
    private user:User = User.createEmpty();
    private router:Router;
    private userService:UserService;
    private cardService:CardService;
    private subThemeService:SubThemeService;
    private file:File = null;
    private cards:Card[] = [];
    private card:Card = Card.createEmpty();
    private themeId:number;

    constructor(private _themeService:ThemeService, router:Router, private _userService:UserService,
                cardService:CardService, routeParams:RouteParams, subThemeService:SubThemeService) {
        this.userService = _userService;
        this.router = router;
        this.themeId = +routeParams.params["id"];
        this.cardService = cardService;
        this.subThemeService = subThemeService;
    }


    ngOnInit() {
        this._themeService.getUserThemes().subscribe((themes:Theme[])=> {
            this.themes = themes;
        });
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });


        for (var i = 0; i < this.themes.length; i++) {
            this._themeService.getThemeSubThemes(this.themes[i].themeId).subscribe(subThemes => {
                for (var j = 0; subThemes.length; j++) {
                    this.themes[i].subThemes.push(subThemes[j]);
                }
            });

        }

        $("#input-search").on("keyup", function () {
            var rex = new RegExp($(this).val(), "i");
            $(".searchable-container .items").hide();
            $(".searchable-container .items").filter(function () {
                return rex.test($(this).text());
            }).show();
        });
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
        } else {
            return "./app/resources/noimgplaceholder.png";
        }
    }

    onFileChange($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("cardimg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }

    onFileChangeSubTheme($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("subthemeImg");
        output.src = URL.createObjectURL($event.target.files[0]);
    }


    onAddCard(themeId:number) {
        this.card.themeId = themeId;
    }

    onAddSubTheme(themeId:number) {
        this.subTheme.subThemeId = themeId;
    }

    onSubmit() {
        if (this.card.description) {
            this.cardService.createCard(this.card, this.file).subscribe(card => {
                this.themes.find(th => th.themeId == card.themeId).cards.push(card);
                this.card.description = null;
                this.file = null;
            }, error => {
                //todo change error display
                this.file = null;
                alert(error.text());
            });
        }
    }

    onSubmitSubTheme() {
        if (this.subTheme.description) {
            this.subThemeService.createSubTheme(this.subTheme, this.file).subscribe(st => {

                this.router.navigate("['/Themes',{id:theme.themeId}]");
                document.location.reload();
                this.themes.find(th => th.themeId == st.themeId).subThemes.push(st);
                this.subTheme.description = null;
                this.file = null;
            }, error => {
                //todo change error display
                this.file = null;
                alert(error.text());
            });
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

    /*
     --------------------------------------------------------------
     --------------------- SORT FUNCTIONS -------------------------
     --------------------------------------------------------------
     */
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
