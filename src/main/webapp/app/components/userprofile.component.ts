import {Component, OnInit} from 'angular2/core';
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";
import {Router, CanActivate} from 'angular2/router';
import {Response} from "angular2/http";
import {tokenNotExpired} from '../security/TokenHelper';

@CanActivate(() => tokenNotExpired())

@Component({
    selector: 'userprofile',
    templateUrl: 'app/components/userprofile.html'
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
            console.log("user before servicecall: " + this.user.password);
            this.userService.updateUser(this.user, this.file).subscribe(
                (r:Response) => {
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

    /*
     ------------------------- GENERAL ------------------------------------
     */

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/Home']);
    }

    private getImageSrc(url:string):string {
        if (url) {
            if (url.indexOf("http://") > -1) {
                return url;
            } else {
                return url.replace(/"/g, "");
            }
        }
    }
}