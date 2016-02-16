import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable} from 'angular2/core'

@Injectable()
export class Service{
    private http: Http=null;
    public static PATH: string= "http://wildfly-teamiip2kdgbe.rhcloud.com/api/";


    constructor(http:Http) {
        this.http = http;
    }

    public getOrganisations() : Observable<Organisation[]>{
        return this.http.get(Service.PATH + 'organisations')
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }
}