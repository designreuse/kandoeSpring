import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {Theme} from "../DOM/theme";
import {User} from "../DOM/users/user";
import {SecurityService} from "../security/securityService";

@Injectable()
export class Service{
    private http: Http=null;
    private path: string;
    private securityService:SecurityService;

    constructor(http:Http, @Inject('App.BackEndPath') path: string,securityService:SecurityService) {
        this.http = http;
        this.path = path;
        this.securityService=securityService;
    }

    public getThemes():Observable<Theme[]>{
        return this.securityService.get(this.path + 'themes', true)
            .map(res => res.json())
            .map((themes:Array<Theme>) => themes.map((theme:Theme) => Theme.fromJson(theme)));
    }
}