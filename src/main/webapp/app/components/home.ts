import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Response} from "angular2/http";

@Component({
    selector: 'home',
    directives: [RegisterComponent],
    templateUrl: 'app/components/home.html'
})

export class Home {
    private router:Router;
    private userService: UserService;

    private username: string;
    private password: string;

    constructor(router:Router, userService: UserService) {
        this.router = router;
        this.userService = userService;
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
                if(res.status == 200){
                    localStorage.setItem("id_token", res.text());
                    this.router.navigate(['/LoggedInHome']);
                }
                else {
                    //todo failure message
                }
            });
    }
}
