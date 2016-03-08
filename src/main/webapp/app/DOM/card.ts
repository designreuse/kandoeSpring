import {Link} from "./link";
import {Theme} from "./theme";

export class Card{
    cardId:number;
    description:string;
    imageURL:string;
    links:Link[];
    theme: Theme;
    themeId: number;
    position: number;

    constructor(){

    }

    static createEmpty(): Card {
        var card = new Card();
        card.theme = Theme.createEmpty();
        return card;
    }

    static fromJson(json:any):Card {
        var card = new Card();
        card.cardId = json.cardId;
        card.description = json.description;
        card.imageURL = json.imageURL;

        if(json.links){
            for (var i = 0; i < json.links.length; i++){
                card.links[i] = Link.fromJson(json.links[i])
            }
        }

        if(json.theme){
            card.theme = Theme.fromJson(json.theme);
        }

        if(json.themeId){
            card.themeId = json.themeId;
        }

        card.position = json.position;

        return card;
    }

}