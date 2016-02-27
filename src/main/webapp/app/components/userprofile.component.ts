import {Component, OnInit} from 'angular2/core';
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Router} from 'angular2/router';
import {Response} from "angular2/http";

@Component({
    selector: 'userprofile',
    template: `
     <form  class="col-lg-offset-3 col-lg-6" method="post" role="form">
        <div class="form-pad">
        <h3>Profile</h3>
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


        <button type="button" class="btn btn-lg btn-info" (click)="onSubmit()">Save changes</button>
        <button *ngIf="!showChangePassword" type="button" class="btn btn-lg btn-info" (click)="changePassword()">Change password</button>
        <button type="button" class="btn btn-lg btn-info" (click)="cancel()">Cancel</button>
        </div>
    </form>

    `
})

export class UserProfileComponent implements OnInit{
    private user: User = User.createEmpty();
    private userService:UserService = null;
    private router: Router;
    private showChangePassword: boolean = false;

    constructor(userService:UserService, router: Router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit(){
        this.userService.getCurrentUser().subscribe(u => {
            this.user = u;
        });
    }

    onSubmit() {
        if(this.showChangePassword){
            if(this.user.password != null && this.user.password != this.user.passwordConfirm){
                //todo proper error display
                alert("new passwords don't match");
            } else if(this.user.oldPassword == null) {
                //todo proper error display
                alert("fill in old password");
            } else {
                this.userService.changePassword(this.user).subscribe(
                    (res: Response) => {
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
            this.userService.updateUser(this.user).subscribe(
                (u: User) => {
                    this.router.navigate(['/LoggedInHome'])
                },
                error => {
                    //todo proper error display
                    alert(error.text());
                }
            )
        }
    }

    changePassword(){
        this.showChangePassword = true;
    }

    cancel(){
        if(this.showChangePassword){
            this.showChangePassword = false;
        } else {
            this.router.navigate(['/LoggedInHome']);
        }
    }
}