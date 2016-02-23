import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {Theme} from "../DOM/Theme";
import {User} from "../DOM/users/user";
import {SecurityService} from "../security/securityService";
@Injectable()
export class Service{
    private http: Http=null;
    private path: string;
    private securityService:SecurityService;

    constructor(http:Http, @Inject('App.DevPath') path: string,securityService:SecurityService) {
        this.http = http;
        this.path = path;
        this.securityService=securityService;
    }

    public getAllOrganisations() : Observable<Organisation[]>{
        return this.securityService.get(this.path + 'organisations',true)
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public getUserOrganisations() : Observable<Organisation[]>{
        /*return this.securityService.get(this.path + 'organisations', true)
        .map(res => res.json())
        .map(((user) => localStorage.getItem("id_token")).call());*/
        return this.securityService.get(this.path + 'organisations/currentUser', true)
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public getThemes():Observable<Theme[]>{
        return this.http.get(this.path+'themes')
            .map(res => res.json())
            .map((themes:Array<Theme>) => themes.map((theme:Theme) => Theme.fromJson(theme)));
    }
}