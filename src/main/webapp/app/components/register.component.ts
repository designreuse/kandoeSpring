/**
 * Created by amy on 16/02/2016.
 */
import {Component, OnInit} from 'angular2/core'
import {Router} from 'angular2/router'
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Response} from "angular2/http";

@Component({
    selector: 'register',
    template: `
    <form  class="col-lg-offset-3 col-lg-6" method="post" role="form">
        <div class="form-pad">
        <h3>Register</h3>
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

        <button type="button" class="btn btn-primary btn-wide" (click)="onSubmit()">Register</button>
        </div>
    </form>
    `,

    inputs: ['register']
})

export class RegisterComponent implements OnInit {
    private user:User = User.createEmpty();
    private userService:UserService = null;
    private router: Router;

    constructor(userService:UserService, router: Router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit() {
    }

    public onSubmit() {
        if (this.user.password != this.user.passwordConfirm) {
            //todo change this
            alert('Passwords don\'t match');
            console.log("passwords not matching");
        } else if(this.user.email == null || this.user.password == null || this.user.username == null) {
            //todo change this
            alert("Fill in required fields!");
        } else {
            this.userService.createUser(this.user).subscribe(
                (res: Response) => {
                    localStorage.setItem("id_token", res.text());
                    this.router.navigate(['/LoggedInHome']);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}