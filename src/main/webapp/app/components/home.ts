import {Component, Injectable, Inject} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Response} from "angular2/http";
import {tokenNotExpired} from "../security/TokenHelper";
import {SecurityService} from "../security/securityService";
import {UploadService} from "../service/uploadService";
import {Headers} from "angular2/http";
import {Person} from "../DOM/users/person";

@Component({
    selector: 'home',
    directives: [RegisterComponent],
    templateUrl: 'app/components/home.html'
})

@Injectable()
export class Home {
    private router:Router;
    private userService:UserService;
    private securityService:SecurityService;

    private username:string;
    private password:string;

    constructor(router:Router, userService:UserService, secService:SecurityService, @Inject('App.BackEndPath') private path:string) {
        this.router = router;
        this.userService = userService;
        this.securityService = secService;

        if (tokenNotExpired()) {
            this.securityService.get(this.path + "login/check", true).subscribe(r => {
                if(r.text().replace(/"/g,"") === "Facebook"){
                    FB.getLoginStatus(response => {
                        if(response.status === "connected"){
                            this.router.navigate(['/LoggedInHome']);
                        } else {
                            localStorage.removeItem("id_token");
                        }
                    })
                } else {
                    this.router.navigate(['/LoggedInHome']);
                }
            }, e => {
                localStorage.removeItem("id_token");
            });
        }
    }

    login() {
        var login = document.getElementById("login-form");
        var register = document.getElementById("register-form");
        login.style.display = "block";
        register.style.display = "none";

    }

    register() {
        var login = document.getElementById("login-form");
        var register = document.getElementById("register-form");
        login.style.display = "none";
        register.style.display = "block";
    }

    onSubmit() {
        this.userService.login(this.username, this.password)
            .subscribe((res:Response) => {
                    localStorage.setItem("id_token", res.text());
                    this.router.navigate(['/LoggedInHome']);
                },
                error => {
                    //todo display proper error
                    alert(error.text());
                });
    }

    facebook() {
        FB.login(response => {
            if(response.authResponse){
                let u = new User();

                FB.api('/me', "get", {fields: 'name,email,first_name,last_name'}, response => {
                    u.email = response.email;
                    u.facebookAccount = true;
                    u.username = response.name.replace(/ /g, "");
                    u.username += "_facebook";
                    let p = new Person();
                    p.firstname = response.first_name;
                    p.lastname = response.last_name;
                    u.person = p;

                    this.userService.createUser(u).subscribe(
                        (res: Response) => {
                            localStorage.setItem("id_token", res.text());
                            this.router.navigate(['/LoggedInHome']);
                        },
                        error => {
                            //todo proper error display
                            alert(error.text());
                        }
                    );
                })
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,public_profile'})
    }

}