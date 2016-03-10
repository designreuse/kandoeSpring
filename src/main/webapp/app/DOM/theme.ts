import {Link} from "./link";
import {Organisation} from "./organisation";
import {Card} from './card';
/**
 * Created by Jordan on 19/02/2016.
 */
export class Theme{
    themeId:number;
    themeName:string;
    description:string;
    organisation:Organisation;
    iconURL:string;
    cards: Card[] = [];

    constructor() {

    }

    static fromJson(json:any):Theme{
        var theme = new Theme();
        theme.iconURL=json.iconURL;
        theme.themeId = json.themeId;
        theme.themeName = json.themeName;
        theme.description = json.description;

        if(json.organisation){
            theme.organisation = Organisation.fromJson(json.organisation);
        }

        if(json.cards){
            theme.cards = [];
            for(var i = 0; i < json.cards.length; i++){
                theme.cards[i] = Card.fromJson(json.cards[i]);
            }
        }
        return theme;
    }

    static createEmpty(): Theme {
        var theme = new Theme();
        return theme;
    }
}