import {Link} from "./link";

export class Card{
    cardId:number;
    description:string;
    imageURL:string;
links:Link[];

    constructor(){

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

        return card;
    }

}