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

    public getUserOrganisations() : Observable<Organisation[]>{
        return this.securityService.get(this.path + 'organisations/currentUser', true)
            .map(res => res.json())
            .map((organisations:Array<Organisation>) => organisations.map((organisation:Organisation) => Organisation.fromJson(organisation)));
    }

    public getOrganisationById(id: number): Observable<Organisation> {
        return this.securityService.get(this.path + 'organisations/' + id, true)
            .map(res => res.json())
            .map((org: Organisation) => Organisation.fromJson(org));
    }

    public createOrganisation(org: Organisation, file?: File): Observable<Response> {
        if(file){
            return this.uploadService.uploadFile(JSON.stringify(org), file, this.path + 'organisations/image');
        } else {
            return this.securityService.post(this.path + 'organisations', JSON.stringify(org), true);
        }
    }

    public getOrganisationOrganisers(orgId: number): Observable<User[]>
    {
        return this.securityService.get(this.path + 'organisations/' + orgId + '/organisers', true)
            .map(res => res.json())
            .map((users: Array<User>) => users.map((u: User) => User.fromJson(u)));
    }

    public getOrganisationMembers(orgId: number): Observable<User[]>
    {
        return this.securityService.get(this.path + 'organisations/' + orgId + '/members', true)
            .map(res => res.json())
            .map((users: Array<User>) => users.map((u: User) => User.fromJson(u)));
    }

    public addMemberToOrganisation(orgId: number, mail: string): Observable<User> {
        var requestparam = "?mail=" + mail;
        return this.securityService.post(this.path + 'organisations/' + orgId + "/addMember" + requestparam, "", true)
            .map(res => res.json())
            .map(u => User.fromJson(u));
    }

    public addOrganiserToOrganisation(orgId: number, mail: string): Observable<User> {
        var requestparam = "?mail=" + mail;
        return this.securityService.post(this.path + 'organisations/' + orgId + "/addOrganiser" + requestparam, "", true)
            .map(res => res.json())
            .map(u => User.fromJson(u));
    }

    public getOrganisationThemes(orgId: number): Observable<Theme[]>
    {
        return this.securityService.get(this.path + 'organisations/' + orgId + '/themes', true)
            .map(res => res.json())
            .map((themes: Array<Theme>) => themes.map((t: Theme) => Theme.fromJson(t)));
    }
}
