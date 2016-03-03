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
import {UploadService} from "./uploadService";

@Injectable()
export class UserService {
    private http: Http = null;
    private path: string;
    private securityService: SecurityService;
    private uploadService: UploadService

    public constructor(http: Http, @Inject('App.BackEndPath') path: string, securityService: SecurityService,uploadService:UploadService){
        this.http = http;
        this.path = path;
        this.securityService = securityService;
        this.uploadService = uploadService;
    }

    public createUser(user: User): Observable<Response>{
        return this.securityService.post(this.path + 'users', JSON.stringify(user), false);
    }

    public login(username: string, password: string): Observable<Response>{
        return this.securityService.post(this.path + 'login', "{ \"username\": \"" + username + "\",\"password\": \"" + password + "\" }", false);
    }

    public getCurrentUser(): Observable<User> {
        return this.securityService.get(this.path + 'users/currentUser', true)
                .map((res: Response) => res.json());
    }

    public updateUser(user: User,file?: File): Observable<Response> {
        if(file){
            return this.uploadService.updateUser(JSON.stringify(user), file);
        } else {
            return this.securityService.post(this.path + 'users/updateUser', JSON.stringify(user), true)
                .map(res => res.json());
        }
    }

    public changePassword(user: User): Observable<Response> {
        return this.securityService.post(this.path + 'users/changePassword', JSON.stringify(user), true);
    }
}
