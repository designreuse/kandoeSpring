import {Link} from "./link";
/**
 * Created by Jordan on 19/02/2016.
 */
export class Theme{
    ThemeId:number;
    ThemeName:string;
    Description:string;
    Organisation:string;
    iconUrl:string;
    links:Link[];

    constructor(ThemeId:number, ThemeName:string, Description:string, Organisation:string) {
        this.ThemeId = ThemeId;
        this.ThemeName = ThemeName;
        this.Description=Description;
        this.Organisation=Organisation;
    }

    static fromJson(json:any):Theme{
        var theme = new Theme(json.ThemeId,json.ThemeName,json.Description,json.Organisation)
        theme.iconUrl=json.iconUrl;

        for (var i = 0; i < json.links.length; i++){
            theme.links[i] = Link.fromJson(json.links[i])
        }

        return theme;
    }
}