import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {UploadService} from "./uploadService";
import {SecurityService} from "../security/securityService";
import {Injectable, Inject} from 'angular2/core'
import {Session} from "../DOM/circleSession/session";
import {Theme} from "../DOM/theme";
import {Response} from "angular2/http";
import {Card} from "../DOM/card";
import {Message} from "../DOM/circleSession/message";

@Injectable()
export class SessionService {
    private path:string;
    private securityService:SecurityService;

    constructor(@Inject('App.BackEndPath') path:string, securityService:SecurityService) {
        this.path = path;
        this.securityService = securityService;
    }

    public getSessionById(sessionId:number):Observable<Session> {
        return this.securityService.get(this.path + 'sessions/' + sessionId, true)
            .map(res => res.json())
            .map((session:Session) => Session.fromJson(session));
    }

    public getUserSessions():Observable<Session[]> {
        return this.securityService.get(this.path + 'sessions/currentUser', true)
            .map(res => res.json())
            .map((sessions:Array<Session>) => sessions.map((session:Session) => Session.fromJson(session)));
    }

    public createSession(session:Session):Observable<Response> {
        return this.securityService.post(this.path + 'sessions', JSON.stringify(session), true);
    }
    
    public addCards(cardIds: Array<number>, sessionId: number): Observable<Session>{
        var cards: Card[] = [];
        for(var i = 0; i < cardIds.length; i++){
            var c = new Card();
            c.cardId = cardIds[i];
            cards[i] = c;
        }
        return this.securityService.post(this.path + 'sessions/' + sessionId + '/addCards', JSON.stringify(cards), true)
            .map(res => res.json())
            .map((session:Session) => Session.fromJson(session));
    }

    public getChatHistory(sessionId: number): Observable<Array<Message>> {
        return this.securityService.get(this.path + 'sessions/' + sessionId + '/chat', true)
            .map(res => res.json())
            .map((messages: Array<Message>) => messages.map((message: Message) => Message.fromJson(message)));
    }

    public checkCanPlay(sessionId: number): Observable<Response> {
        return this.securityService.get(this.path + 'sessions/' + sessionId + '/canPlay', true);
    }
}
