/**
 * Created by amy on 16/02/2016.
 */
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {User} from "../DOM/users/user";
import {Headers} from "angular2/http";

@Injectable()
export class UserService {
    private http: Http = null;
    private path: string;

    public constructor(http: Http, @Inject('App.DevPath') path: string){
        this.http = http;
        this.path = path;
    }

    public createUser(user: User): Observable<User>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(user));
        return this.http.post(this.path + 'users', JSON.stringify(user), {headers: headers})
            .map((res: Response) => res.json());
    }
}
