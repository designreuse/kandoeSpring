import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";

@Component({
    selector: 'home',
    directives: [RegisterComponent],
    templateUrl: 'app/components/home.html'
})

export class Home {
    private router:Router;

    constructor(router:Router) {
        this.router = router;
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

    submit(){
        alert("Submitted")
    }
}
