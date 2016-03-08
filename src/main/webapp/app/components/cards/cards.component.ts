import {tokenNotExpired} from "../../security/TokenHelper";
import {Component, OnInit} from 'angular2/core'
import {RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {Card} from "../../DOM/card";
import {CardService} from "../../service/cardService";

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'cards',
    directives: [ROUTER_DIRECTIVES, RouterLink],
    templateUrl: 'app/components/cards/cards.html',
    inputs: ['cards']

})

export class CardsComponent implements OnInit {
    public cards:Card[] = [];

    constructor(private _cardService:CardService , private _router:Router) {
    }

    ngOnInit() {
        this._cardService.getAllCards().subscribe((cards:Card[])=> this.cards = cards);

        $('#input-search').on('keyup', function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container .items').hide();
            $('.searchable-container .items').filter(function () {
                return rex.test($(this).text());
            }).show();
        });
    }

  private getImageSrc(url: string, id: number): string {
        if(url){
            if(url.indexOf("http://") > -1){
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }

    sortNameAsc(){
        var items = $('#sort-list li.items').get();
        items.sort(function(a,b){
            var keyA = $(a).find("h2.title").text();
            var keyB = $(b).find("h2.title").text();

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        var ul = $('#sort-list');
        $.each(items, function(i, li){
            ul.append(li);
        });
    }

    sortNameDesc(){

        var items = $('#sort-list li.items').get();
        items.sort(function(a,b){
            var keyA = $(a).find("h2.title").text();
            var keyB = $(b).find("h2.title").text();

            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        var ul = $('#sort-list');
        $.each(items, function(i, li){
            ul.append(li);
        });
    }

}