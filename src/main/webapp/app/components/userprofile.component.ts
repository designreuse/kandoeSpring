import {Component, OnInit} from 'angular2/core';
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Router, CanActivate} from 'angular2/router';
import {Response} from "angular2/http";
import {tokenNotExpired} from '../security/TokenHelper';

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'userprofile',
    template: `
    <header>
        <div class="container clearfix">
            <h2><span class="glyphicon glyphicon-user"></span> {{user.person.firstname}}<span *ngIf="!user.person.firstname"> Profile</span> {{user.person.lastname}}<span *ngIf="!user.person.lastname"></span> </h2>
        </div>
    </header>
    <div class="container main">
     <div class="center-container col-lg-offset-2 col-lg-8">
        <img class="img-responsive img-thumbnail" id="profile-picture" src="https://zblogged.com/wp-content/uploads/2015/11/c1.png">
     </div>
     <form  class="well well-lg col-lg-offset-2 col-lg-8" method="post" role="form">
        <div class="form-pad">
        <div *ngIf="!showChangePassword">
            <div class="form-group">
                <label>Username</label>
                <input disabled type="text" placeholder="Enter username" class="form-control" [(ngModel)]="user.username">
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input disabled type="text" placeholder="Enter email address" class="form-control" [(ngModel)]="user.email">
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
            <div class="row">
                <div class="col-sm-8 form-group">
                    <label>Street</label>
                    <input type="text" placeholder="Enter street" class="form-control" [(ngModel)]="user.person.address.street">
                </div>
                <div class="col-sm-4 form-group">
                    <label>Number</label>
                    <input type="text" placeholder="Enter streetnumber" class="form-control" [(ngModel)]="user.person.address.number">
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
            <div class="row">
                <div class="col-sm-8 form-group">
                    <label>Logo</label>
                    <input type="file" multiple="false" (change)="onFileChange($event)">
                </div>
            </div>
        </div>
        <div *ngIf="showChangePassword">
            <div class="form-group">
                <label>Old password</label>
                <input type="password" placeholder="Enter password" class="form-control" [(ngModel)]="user.oldPassword">
            </div>

            <div class="form-group">
                <label>New password</label>
                <input type="password" placeholder="Enter password" class="form-control" [(ngModel)]="user.password">
            </div>
            <div class="form-group">
                <label>Password confirmation</label>
                <input type="password" placeholder="Enter password again" class="form-control" [(ngModel)]="user.passwordConfirm">
            </div>
        </div>


        </div>
    </form>

    <div class="center-container col-lg-offset-2 col-lg-8">
        <div class="row">
            <div class="col-sm-4">
                <button type="button" class="btn btn-login btn-primary" (click)="onSubmit()">Save changes</button>
            </div>
            <div class="col-sm-4">
                <button *ngIf="!showChangePassword" type="button" class="btn btn-login btn-primary" (click)="changePassword()">Change password</button>
            </div>
            <div class="col-sm-4">
                <button type="button" class="btn btn-login btn-primary" (click)="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</div>
    `
})

export class UserProfileComponent implements OnInit {
    private user:User = User.createEmpty();
    private userService:UserService = null;
    private router:Router;
    private showChangePassword:boolean = false;
    private file:File = null;

    constructor(userService:UserService, router:Router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit() {
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
            console.log("init user password: " + u.password)
        });
    }

    onSubmit() {
        if (this.showChangePassword) {
            if (this.user.password != null && this.user.password != this.user.passwordConfirm) {
                //todo proper error display
                alert("new passwords don't match");
            } else if (this.user.oldPassword == null) {
                //todo proper error display
                alert("fill in old password");
            } else {
                this.userService.changePassword(this.user).subscribe(
                    (res:Response) => {
                        this.user.oldPassword = null;
                        this.user.password = null;
                        this.user.passwordConfirm = null;
                        this.showChangePassword = false;
                        //todo proper display
                        alert("Password changed");
                    },
                    error => {
                        // proper error display
                        alert(error.text());
                    }
                )
            }
        } else {
            console.log("user before servicecall: "+this.user.password);
            this.userService.updateUser(this.user,this.file).subscribe(
                (u:User) => {
                    this.router.navigate(['/LoggedInHome'])
                },
                error => {
                    //todo proper error display
                    alert(error.text());
                }
            )
        }
    }

    changePassword() {
        this.showChangePassword = true;
    }

    cancel() {
        if (this.showChangePassword) {
            this.showChangePassword = false;
        } else {
            this.router.navigate(['/LoggedInHome']);
        }
    }

    onFileChange($event) {
        this.file = $event.target.files[0];

        var output = document.getElementById("profile-picture");
        output.src = URL.createObjectURL($event.target.files[0]);
    }
}