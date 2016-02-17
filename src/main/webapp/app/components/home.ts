import {Component} from "angular2/core";
import {RegisterComponent} from "./register.component";
import {OrganisationsComponent} from "./organisations.component";
import {RouteConfig, Router} from "angular2/router";
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";

@Component({
    selector: 'home',
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
                                    <form id="register-form" class="col-lg-offset-2 col-lg-8" method="post" role="form" style="display: none;">
                                            <div class="form-group">
                                                <label>Username</label>
                                                <input type="text" placeholder="Enter username" class="form-control" [(ngModel)]="user.username">
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" placeholder="Enter password" class="form-control" [(ngModel)]="user.password">
                                            </div>
                                            <div class="form-group">
                                               <!-- <label class="col-sm-2 control-label" for="inputError">
                                                Input with error and icon</label>
                                                <div class="col-sm-10">
                                                  <input type="text" class="form-control" id="inputError">
                                                  <span class="glyphicon glyphicon-remove form-control-feedback"></span>
                                                </div> -->
                                                <label>Password confirmation</label>
                                                <input type="password" placeholder="Enter password again" class="form-control" [(ngModel)]="user.passwordConfirm">
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 form-group">
                                                    <label>First Name</label>
                                                    <input type="text" placeholder="Enter first name" class="form-control" [(ngModel)]="user.person.firstname">
                                                </div>
                                                <div class="col-sm-8 form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" placeholder="Enter last name" class="form-control" [(ngModel)]="user.person.lastname">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Email Address</label>
                                                <input type="text" placeholder="Enter email address" class="form-control" [(ngModel)]="user.email">
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-8 form-group">
                                                    <label>Street</label>
                                                    <input type="text" placeholder="Enter street" class="form-control" [(ngModel)]="user.person.address.street">
                                                </div>
                                                <div class="col-sm-4 form-group">
                                                    <label>Number</label>
                                                    <input type="text" placeholder="Enter streetnumber" class="form-control" [(ngModel)]="user.person.address.streetNumber">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-8 form-group">
                                                    <label>City</label>
                                                    <input type="text" placeholder="Enter city name" class="form-control" [(ngModel)]="user.person.address.city">
                                                </div>
                                                <div class="col-sm-4 form-group">
                                                    <label>Zip</label>
                                                    <input type="text" placeholder="Enter zip code" class="form-control" [(ngModel)]="user.person.address.zip">
                                                </div>
                                            </div>
                                        <button type="button" class="btn btn-lg btn-info" (click)="onSubmit()">Submit</button>
                                    </form>
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

    private user:User = User.createEmpty();
    private userService:UserService = null;
    private router:Router;

    constructor(userService:UserService, router:Router) {
        this.userService = userService;
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

    onRegister() {
        this.router.navigate(['/Register']);

    }

    ngOnInit() {
    }

    public onSubmit() {
        if (this.user.password != this.user.passwordConfirm) {
            //do something
            console.log("passwords not matching");
        } else {
            this.userService.createUser(this.user).subscribe(
                (u:User) => {
                    console.log(JSON.stringify(u));
                    //todo navigate to page
                    //this.router.navigate(['/Organisations']);
                }
            );
        }
    }
}
