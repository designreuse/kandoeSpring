import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";

@Component({
    selector: 'home',
    directives: [RegisterComponent],
    template: `
<div class="home">
    <h1 class="jumbotron">Welcome to Kandoe</h1>

    <div class="background-img">
    <h2 class="col-md-12 intro">Free platform for making decisions <br>
        Easy to use<br>
        You can participate with a lot of people</h2>

        <div class="container well">
            <div class="row">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-lg-12 intro">
                                <button type="button" class="btn-info btn-sm col-lg-offset-3 col-lg-2" (click)="login()">Log in</button>
                                <button type="button" class="btn-info btn-sm col-lg-offset-1 col-lg-2" (click)="register()">Register</button>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            	<div class="col-lg-12">
                                    <form id="login-form" class="col-lg-offset-2 col-lg-8" method="post" role="form" style="display: block;">
                                        <div class="form-group">
                                            <label>Username</label>
                                            <input type="text" name="username" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" name="password" class="form-control"/>
                                        </div>
                                        <button type="button" class="btn btn-lg btn-info" (click)="submit()">Submit</button>
                                    </form>
                                    <register id="register-form" style="display: none"></register>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `
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
}
