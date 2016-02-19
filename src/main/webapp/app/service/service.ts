import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {Theme} from "../DOM/Theme";

@Injectable()
export class Service{
    private http: Http=null;
    private path: string;


    constructor(http:Http, @Inject('App.DevPath') path: string) {
        this.http = http;
        this.path = path;
    }

    public getOrganisations() : Observable<Organisation[]>{
        return this.http.get(this.path + 'organisations')
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public getThemes():Observable<Theme[]>{
        return this.http.get(this.path+'themes')
            .map(res => res.json())
            .map((themes:Array<Theme>) => themes.map((theme:Theme) => Theme.fromJson(theme)));
    }
}