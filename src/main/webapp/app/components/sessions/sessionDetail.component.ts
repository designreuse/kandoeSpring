import {Component, OnInit} from 'angular2/core'
import {tokenNotExpired} from "../../security/TokenHelper";
import {RouteParams, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {SessionService} from "../../service/sessionService";
import {Card} from "../../DOM/card";
import {Session} from "../../DOM/circleSession/session";
import {UserService} from "../../service/userService";
import {User} from "../../DOM/users/user";
import {Person} from "../../DOM/users/person";



@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'session-detail',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    template: `
    <nav class="navbar navbar-inverse navbar-fixed-top " role="navigation">
        <div class="container">
            <div class="navbar-header ">
                <button type="button" class="navbar-toggle" data-toggle="dropdown-toggle"
                        data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="./">
                    KAN<span>DOE</span></a>
            </div>
            <ul class="nav navbar-nav navwidth">
                <li><a [routerLink]="['/LoggedInHome']">   KANDOES   </a></li>
                <li > <a [routerLink]="['/Organisations']">  ORGANISATIONS   </a> </li>
                <li class="active"> <a href="#">    THEMES   </a> </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><img class="img-responsivenav img-thumbnailnav" id="profile-picturenav"  [src]="getImageSrc(user.profilePicture)">
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.person.firstname}} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li> <a class="glyphicon" [routerLink]="['/Userprofile']">Edit profile</a></li>
                        <li role="separator" class="divider"></li>
                        <li> <a class="glyphicon glyphicon-log-out"  (click)="logout()"> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <header>
        <div class="container clearfix">
            <h3>THEME</h3>
        </div>
    </header>
    <div class="container main">
        <ol class="breadcrumb">
            <li><a [routerLink]="['/LoggedInHome']"> Kandoes</a></li>
            <li><a [routerLink]="['/Themes']">Themes</a></li>
            <li class="active"> Add theme</li>
        </ol>
        <div class="row">

        </div>
        <div class="row">
            <div class="center-container">
                <svg id="circlesvg" width="100%" height="100%">
                    <circle *ngFor="#siz of size" [attr.cx]="calculateWidthCentre()" [attr.cy]="calculateHeightCentre()" [attr.r]="60 + (60*siz)" stroke="#fff" stroke-width="8" fill="#1E8BC3"/>
                </svg>
            </div>
        </div>
    </div>
    `
})

export class SessionDetailComponent implements OnInit{
    private sessionService: SessionService;
    private router: Router;
    private session: Session;
    private sessionId: number;
    private size: Array<number> = [];

    private user: User = User.createEmpty();
    private userService: UserService;


    constructor(sesService: SessionService, private _userService:UserService, router: Router, routeParams: RouteParams){
        this.sessionService = sesService;
        this.router = router;
        this.sessionId = +routeParams.params["id"];
        this.userService=_userService;
    }

    ngOnInit(){
        this.sessionService.getSessionById(this.sessionId).subscribe(s => {
            console.log(JSON.stringify(s));
            this.session = s;
             var j = s.size;
            for(var i = 0; i < s.size; i++){
                this.size[i] = j-1;
                j = j-1;
            }
        });

        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    calculateWidthCentre(){
        var width = document.getElementById("circlesvg").clientWidth;
        return width/2;
    }

    calculateHeightCentre(){
        var height= document.getElementById("circlesvg").clientHeight;
        return height/2;
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

}