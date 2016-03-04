import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {Response} from 'angular2/http'
import {Injectable, Inject} from 'angular2/core'
import {isPresent} from "angular2/src/facade/lang";
import {Headers} from "angular2/http";
import {getResponseURL} from "angular2/src/http/http_utils";
import {ResponseOptions} from "angular2/http";
import {ResponseType} from "angular2/http";
import {Observer} from "rxjs/Observer";
import {isSuccess} from "angular2/src/http/http_utils";
import {Organisation} from "../DOM/organisation";

@Injectable()
export class UploadService {
    private path: string;

    constructor(@Inject('App.BackEndPath') path: string){
        this.path = path;
    }

    public uploadFile(body: string, file: File, url:string): Observable<Response> {
        return new Observable((responseObserver: Observer<Response>) => {
            //http://stackoverflow.com/questions/21329426/spring-mvc-multipart-request-with-json/25183266#25183266
            if(file.type.split("/")[0] != "image"){
                var options = new ResponseOptions({body: "You have to select an image", type: ResponseType.Error});
                responseObserver.error(new Response(options));
                responseObserver.complete();
            } else {
                let formdata = new FormData();
                formdata.append("file", file);
                formdata.append("body", new Blob([body], {type: "application/json"}));

                let request = new XMLHttpRequest();
                request.onload = () =>{
                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/backends/xhr_backend.ts
                    let body = isPresent(request.response) ? request.response : request.responseText;

                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/headers.ts
                    let headers = Headers.fromResponseHeaderString(request.getAllResponseHeaders());

                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/http_utils.ts
                    let url = getResponseURL(request);

                    let status: number = request.status === 1223 ? 204 : request.status;
                    if (status === 0) {
                        status = body ? 200 : 0;
                    }

                    var responseOptions = new ResponseOptions({body, status, headers, url});
                    let response = new Response(responseOptions);

                    if (isSuccess(status)) {
                        responseObserver.next(response);
                        // TODO(gdi2290): defer complete if array buffer until done
                        responseObserver.complete();
                        return;
                    }
                    responseObserver.error(response);
                };

                request.onerror = (err: any ) => {
                    var responseOptions = new ResponseOptions({body: err, type: ResponseType.Error});
                    responseObserver.error(new Response(responseOptions));
                };

                request.open("POST", url, true);
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("id_token"));
                request.send(formdata);
            }
        });
    }

    /*public updateUser(body: string, file: File): Observable<Response> {
        return new Observable((responseObserver: Observer<Response>) => {
            //http://stackoverflow.com/questions/21329426/spring-mvc-multipart-request-with-json/25183266#25183266
            console.log(body);
            if(file.type.split("/")[0] != "image"){
                var options = new ResponseOptions({body: "You have to select an image", type: ResponseType.Error});
                responseObserver.error(new Response(options));
                responseObserver.complete();
            } else {
                let formdata = new FormData();
                formdata.append("file", file);
                formdata.append("body", new Blob([body], {type: "application/json"}));

                let request = new XMLHttpRequest();
                request.onload = () =>{
                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/backends/xhr_backend.ts
                    let body = isPresent(request.response) ? request.response : request.responseText;

                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/headers.ts
                    let headers = Headers.fromResponseHeaderString(request.getAllResponseHeaders());

                    //https://github.com/angular/angular/blob/master/modules/angular2/src/http/http_utils.ts
                    let url = getResponseURL(request);

                    let status: number = request.status === 1223 ? 204 : request.status;
                    if (status === 0) {
                        status = body ? 200 : 0;
                    }

                    var responseOptions = new ResponseOptions({body, status, headers, url});
                    let response = new Response(responseOptions);
                    if (isSuccess(status)) {
                        responseObserver.next(response);
                        // TODO(gdi2290): defer complete if array buffer until done
                        responseObserver.complete();
                        return;
                    }
                    responseObserver.error(response);
                };

                request.onerror = (err: any ) => {
                    var responseOptions = new ResponseOptions({body: err, type: ResponseType.Error});
                    responseObserver.error(new Response(responseOptions));
                };

                request.open("POST", this.path + "users/updateUser/image", true);
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("id_token"));
                request.send(formdata);
            }
        });
    }*/
}
