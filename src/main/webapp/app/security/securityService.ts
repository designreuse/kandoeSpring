/**
 * Created by Jordan on 22/02/2016.
 */
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {tokenNotExpired} from "./TokenHelper";
import {Headers} from "angular2/http";
import {Router} from "angular2/router";
@Injectable()
export class SecurityService{
    private http: Http=null;
    private path: string;
    private router: Router;

    constructor(http:Http, @Inject('App.DevPath') path: string,router:Router) {
        this.http = http;
        this.path = path;
        this.router=router;
    }

    public get(url: string, withSecurity: boolean) : Observable<Response>{
        var headers = new Headers();
        if(withSecurity){
            if(tokenNotExpired()){
                headers.append('Authorization', "Bearer "+localStorage.getItem("id_token"));
            } else {
                this.router.navigate(["/Home"]);
            }
        }

        return this.http.get(url,{headers:headers});
    }

    public post(url: string, body: string, withSecurity: boolean):Observable<Response>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(withSecurity){
            if(tokenNotExpired()){
                headers.append('Authorization', "Bearer " + localStorage.getItem("id_token"));
            }
        }
        return this.http.post(url, body, {headers: headers});
    }
}