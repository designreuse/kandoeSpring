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

    constructor(themeId:number, themeName:string, description:string, organisation:string) {
        this.themeId = themeId;
        this.themeName = themeName;
        this.description=description;
        this.organisation=organisation;
    }

    static fromJson(json:any):Theme{
        var theme = new Theme(json.themeId,json.themeName,json.description,json.organisation);
        theme.iconUrl=json.iconUrl;

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