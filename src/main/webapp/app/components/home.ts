import {Component, Injectable, Inject} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Response} from "angular2/http";
import {tokenNotExpired} from "../security/TokenHelper";
import {SecurityService} from "../security/securityService";

@Component({
    selector: 'home',
    directives: [RegisterComponent],
    templateUrl: 'app/components/home.html'
})

@Injectable()
export class Home {
    private router:Router;
    private userService: UserService;
    private securityService: SecurityService;

    private username: string;
    private password: string;

    constructor(router:Router, userService: UserService, secService: SecurityService, @Inject('App.BackEndPath') private path: string) {
        this.router = router;
        this.userService = userService;
        this.securityService = secService;

        if(tokenNotExpired()){
            this.securityService.get(this.path + "login/check", true).subscribe(r => {
                this.router.navigate(['/LoggedInHome']);
            },e => {
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

    onSubmit(){
        this.userService.login(this.username, this.password)
            .subscribe((res: Response) => {
                    localStorage.setItem("id_token", res.text());
                    this.router.navigate(['/LoggedInHome']);
            },
            error => {
                //todo display proper error
                alert(error.text());
            });
    }
}
