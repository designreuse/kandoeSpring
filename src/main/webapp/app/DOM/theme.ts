import {Link} from "./link";
import {Organisation} from "./organisation";
/**
 * Created by Jordan on 19/02/2016.
 */
export class Theme{
    themeId:number;
    themeName:string;
    description:string;
    organisation:Organisation;
    iconURL:string;

    constructor() {

    }

    static fromJson(json:any):Theme{
        console.log(json);
        var theme = new Theme();
        theme.iconURL=json.iconURL;
        theme.themeId = json.themeId;
        theme.themeName = json.themeName;
        theme.description = json.description;

        theme.organisation = Organisation.fromJson(json.organisation);
        return theme;
    }

    static createEmpty(): Theme {
        var theme = new Theme();
        return theme;
    }
}