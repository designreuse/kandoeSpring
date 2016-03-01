import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {Theme} from "../DOM/theme";
import {User} from "../DOM/users/user";
import {SecurityService} from "../security/securityService";
import {UploadService} from "./uploadService";

@Injectable()
export class OrganisationService{
    private path: string;
    private securityService:SecurityService;
    private uploadService: UploadService;

    constructor(@Inject('App.BackEndPath') path: string,securityService:SecurityService, uploadService: UploadService) {
        this.path = path;
        this.securityService=securityService;
        this.uploadService = uploadService;
    }

    public getAllOrganisations() : Observable<Organisation[]>{
        return this.securityService.get(this.path + 'organisations',true)
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public getUserOrganisations() : Observable<Organisation[]>{
        return this.securityService.get(this.path + 'organisations/currentUser', true)
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public createOrganisation(org: Organisation, file?: File): Observable<Response> {
        if(file){
            return this.uploadService.createOrganisation(JSON.stringify(org), file);
        } else {
            return this.securityService.post(this.path + 'organisations', JSON.stringify(org), true);
        }
    }
}
