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

    public getUserSubThemes():Observable<SubTheme[]> {
        return this.securityService.get(this.path + 'themes/currentUser', true)
            .map(res => res.json())
            .map((subThemes:Array<SubTheme>) => subThemes.map((subTheme:SubTheme) => SubTheme.fromJson(subTheme)));
    }

    public createSubTheme(subTheme:SubTheme,file?:File):Observable<SubTheme> {
        var response: Observable<Response>;
        if(file){
            response = this.uploadService.uploadFile(JSON.stringify(subTheme), file, this.path + 'subThemes/image');
        } else {
            response =  this.securityService.post(this.path + 'subThemes', JSON.stringify(subTheme), true);
        }
        return response.map(res => res.json())
                        .map((st: SubTheme) => SubTheme.fromJson(st));
    }

    public getSubTheme(id:number):Observable<SubTheme>{
        return this.securityService.get(this.path + 'subThemes/' + id,true)
            .map(res => res.json())
            .map((subTheme:SubTheme) => SubTheme.fromJson(subTheme))
    }

    public getSubThemeCards(subThemeId: number): Observable<Card[]> {
        return this.securityService.get(this.path + 'subThemes/' + subThemeId + '/cards', true)
            .map(res => res.json())
            .map((cards: Array<Card>) => cards.map((card: Card) => Card.fromJson(card)));
    }

    public addCardsToSubTheme(cardIds: Array<number>, subThemeId: number): Observable<SubTheme>{
        var cards: Card[] = [];
        for(var i = 0; i < cardIds.length; i++){
            var c = new Card();
            c.cardId = cardIds[i];
            cards[i] = c;

        }
        return this.securityService.post(this.path + 'subThemes/' + subThemeId + '/addCards', JSON.stringify(cards), true)
            .map(res => res.json())
            .map((subTheme:SubTheme) => SubTheme.fromJson(subTheme));
    }
}
