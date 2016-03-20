import {Link} from "./link";
import {Organisation} from "./organisation";
import {Card} from './card';
import {Theme} from "./theme";

export class SubTheme{
    subThemeId:number;
    subThemeName:string;
    description:string;
    organisation:Organisation;
    iconURL:string;
    cards: Card[] = [];
    themeId: number;

    constructor() {

    }

    static fromJson(json:any):SubTheme{
        var subTheme = new SubTheme();
        subTheme.iconURL=json.iconURL;
        subTheme.subThemeId = json.subThemeId;
        subTheme.subThemeName = json.subThemeName;
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

        if(json.themeId){
            subTheme.themeId = json.themeId;
        }

        return subTheme;
    }

    static createEmpty(): SubTheme {
        var subTheme = new SubTheme();
        return subTheme;
    }

}