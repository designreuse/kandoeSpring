import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {Theme} from "../DOM/theme";
import {User} from "../DOM/users/user";
import {SecurityService} from "../security/securityService";
import {UploadService} from "./uploadService";
/**
 * Created by Jordan on 29/02/2016.
 */

@Injectable()
export class ThemeService {
    private path:string;
    private securityService:SecurityService;
    private uploadService:UploadService;

    constructor(@Inject('App.BackEndPath') path:string, securityService:SecurityService, uploadService:UploadService) {
        this.path = path;
        this.securityService = securityService;
        this.uploadService = uploadService;
    }

    public getAllThemes():Observable<Theme[]> {
        return this.securityService.get(this.path + 'themes', true)
            .map(res => res.json())
            .map((themes:Array<Theme>) => themes.map((theme:Theme) => Theme.fromJson(theme)));
    }

    public getUserThemes():Observable<Theme[]> {
        return this.securityService.get(this.path + 'themes/currentUser', true)
            .map(res => res.json())
            .map((themes:Array<Theme>) => themes.map((theme:Theme) => Theme.fromJson(theme)));
    }

    public createTheme(theme:Theme,file?:File):Observable<Response> {
        console.log(theme);
        return this.securityService.post(this.path + 'themes', JSON.stringify(theme), true);
    }
}
