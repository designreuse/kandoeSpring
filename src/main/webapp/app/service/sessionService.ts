import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {UploadService} from "./uploadService";
import {SecurityService} from "../security/securityService";
import {Injectable, Inject} from 'angular2/core'
import {Session} from "../DOM/circleSession/session";

@Injectable()
export class SessionService {
    private path: string;
    private securityService:SecurityService;

    constructor(@Inject('App.BackEndPath') path: string,securityService:SecurityService) {
        this.path = path;
        this.securityService=securityService;
    }

    public getSessionById(sessionId: number): Observable<Session> {
        return this.securityService.get(this.path + 'sessions/' + sessionId, true)
            .map(res => res.json())
            .map((session: Session) => Session.fromJson(session));
    }

    public getUserSessions(): Observable<Session[]> {
        return this.securityService.get(this.path + 'sessions/currentUser', true)
            .map(res => res.json())
            .map((sessions: Array<Session>) => sessions.map((session: Session) => Session.fromJson(session)));
    }
}
