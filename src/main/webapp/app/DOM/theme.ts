import {Link} from "./link";
/**
 * Created by Jordan on 19/02/2016.
 */
export class Theme{
    themeId:number;
    themeName:string;
    description:string;
    organisation:string;
    iconUrl:string;
    links:Link[];

    constructor() {

    }

    static fromJson(json:any):Theme{
        var theme = new Theme();
        theme.iconUrl=json.iconUrl;
        theme.themeId = json.themeId;
        theme.themeName = json.themeName;
        theme.description = json.description;
        theme.organisation = json.organisation;

        for (var i = 0; i < json.links.length; i++){
            theme.links[i] = Link.fromJson(json.links[i])
        }

        return theme;
    }

    static createEmpty(): Theme {
        var theme = new Theme();
        return theme;
    }
}