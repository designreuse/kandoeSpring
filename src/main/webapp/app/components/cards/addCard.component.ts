import {tokenNotExpired} from "../../security/TokenHelper";
import {Component, OnInit} from 'angular2/core'
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {Card} from "../../DOM/card";
import {CardService} from "../../service/cardService";


@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'add-card',
    template: `
     <header>
        <div class="container page-header">
            <h3><span class="glyphicon glyphicon-plus-sign"></span> Add new card</h3>
        </div>
    </header>
    <div class="container main">
        <form  class="col-lg-offset-2 col-lg-8" method="post" role="form">
            <div class="form-padadd-org">

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Enter card description" class="form-control" [(ngModel)]="card.description">
                </div>

                <div class="form-group">
                    <label>Image</label>
                    <input type="file" multiple="false" (change)="onFileChange($event)">
                </div>
                <div class="items">
                    <div class="item">
                        <div class="id"><p>1</p></div>
                        <img alt="logo" [src]="getImageSrc(card.imageURL, card.cardId)" />
                        <div class="info">
                            <h2 class="title">{{card.description}}</h2>

                        </div>
                        <div class="social">
                            <ul>
                                <li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
                                <li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>
                                <li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-lg btn-info glyphicon glyphicon-plus" (click)="onSubmit()"> Create new card</button>
            </div>
        </form>

    <form id="form1" runat="server">
        <input type='file' id="imgInp" />
        <br>
        <img id="blah" src="http://i.imgur.com/zAyt4lX.jpg" alt="your image" height="100" />
    </form>
    </div>
            `

})


export class AddCardComponent implements OnInit{
    private card:Card = Card.createEmpty();
    private cardService:CardService;
    private router:Router;
    private file:File = null;


    constructor(cardService:CardService, router:Router) {
        this.cardService = cardService;
        this.router = router;
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
    }

    onSubmit() {
        this.cardService.createCard(this.card, this.file).subscribe(res => {
            this.router.navigate(['/Cards']);
            this.file = null;
        }, error => {
            //todo change error display
            this.file = null;
            alert(error.text());
        });
    }
}

