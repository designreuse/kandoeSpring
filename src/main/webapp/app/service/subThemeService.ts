import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Organisation} from "../DOM/organisation";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {User} from "../DOM/users/user";
import {SubTheme} from "../DOM/subTheme";
import {SecurityService} from "../security/securityService";
import {UploadService} from "./uploadService";
import {Card} from "../DOM/card";

@Injectable()
export class SubThemeService {
    private path:string;
    private securityService:SecurityService;
    private uploadService:UploadService;

    constructor(@Inject('App.BackEndPath') path:string, securityService:SecurityService, uploadService:UploadService) {
        this.path = path;
        this.securityService = securityService;
        this.uploadService = uploadService;
    }

    public getAllSubThemes():Observable<SubTheme[]> {
        return this.securityService.get(this.path + 'subThemes', true)
            .map(res => res.json())
            .map((subThemes:Array<SubTheme>) => subThemes.map((subTheme:SubTheme) => SubTheme.fromJson(SubTheme)));
    }

    public getUserSubThemes():Observable<SubTheme[]> {
        return this.securityService.get(this.path + 'themes/currentUser', true)
            .map(res => res.json())
            .map((subThemes:Array<SubTheme>) => subThemes.map((subTheme:SubTheme) => SubTheme.fromJson(subTheme)));
    }

    public createSubTheme(subTheme:SubTheme,file?:File):Observable<Response> {
        if(file){
            return this.uploadService.uploadFile(JSON.stringify(subTheme), file, this.path + 'subThemes/image');
        } else {
            return this.securityService.post(this.path + 'subThemes', JSON.stringify(subTheme), true);
        }

    }

    public getSubTheme(id:number):Observable<SubTheme>{
        return this.securityService.get(this.path + 'themes/' + id,true)
            .map(res => res.json())
            .map((subTheme:SubTheme) => SubTheme.fromJson(subTheme))
    }

    public getSubThemeCards(themeId: number): Observable<Card[]> {
        return this.securityService.get(this.path + 'subThemes/' + themeId + '/cards', true)
            .map(res => res.json())
            .map((cards: Array<Card>) => cards.map((card: Card) => Card.fromJson(card)));
    }
}
