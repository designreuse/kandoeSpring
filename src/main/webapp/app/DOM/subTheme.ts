import {Link} from "./link";
import {Organisation} from "./organisation";
import {Card} from './card';

export class SubTheme{
    themeId:number;
    themeName:string;
    description:string;
    organisation:Organisation;
    iconURL:string;
    cards: Card[] = [];

    constructor() {

    }

    static fromJson(json:any):SubTheme{
        var subTheme = new SubTheme();
        subTheme.iconURL=json.iconURL;
        subTheme.themeId = json.themeId;
        subTheme.themeName = json.themeName;
        subTheme.description = json.description;

        if(json.organisation){
            subTheme.organisation = Organisation.fromJson(json.organisation);
        }

        if(json.cards){
            subTheme.cards = [];
            for(var i = 0; i < json.cards.length; i++){
                subTheme.cards[i] = Card.fromJson(json.cards[i]);
            }
        }
        return subTheme;
    }

    static createEmpty(): SubTheme {
        var subTheme = new SubTheme();
        return subTheme;
    }

}