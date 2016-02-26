/**
 * Created by amy on 16/02/2016.
 */
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {User} from "../DOM/users/user";
import {Headers} from "angular2/http";
import {SecurityService} from "../security/securityService";

@Injectable()
export class UserService {
    private http: Http = null;
    private path: string;
    private securityService: SecurityService;

    public constructor(http: Http, @Inject('App.DevPath') path: string, securityService: SecurityService){
        this.http = http;
        this.path = path;
        this.securityService = securityService;
    }

    public createUser(user: User): Observable<Response>{
        return this.securityService.post(this.path + 'users', JSON.stringify(user), false);
    }

    public login(username: string, password: string): Observable<Response>{
        return this.securityService.post(this.path + 'login', "{ \"username\": \"" + username + "\",\"password\": \"" + password + "\" }", false);
    }
}
