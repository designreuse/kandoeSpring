import {Component} from "angular2/core";

@Component({
    selector: 'home',
    template: `

<div class="home">
    <h1 class="jumbotron">Welcome to Kandoe</h1>
    <div class="background-img">
    <h2 class="col-md-12 intro">Free platform for making decisions <br>
        Easy to use<br>
        You can participate with a lot of people</h2>

        <div *ngIf="loginFormVisible == false">
            <button class="col-md-3 col-md-offset-2" (click)="login()">Log in</button>
        </div>
        <div *ngIf="loginFormVisible == true">
            <form method="post">
                <input type="text" name="username" />
                <input type="password" name="password"/>
                <input type="submit" name="login" value="submit"/>
            </form>
        </div>
        <div *ngIf="registerFormVisible == false">
            <button class="col-md-3 col-md-offset-1" (click)="register()">Register</button>
        </div>
        <div *ngIf="registerFormVisible == true">
             <form method="post" action="/login">
                <input type="text" name="username" />
                <input type="password" name="password"/>
                <input type="submit" name="login" value="submit"/>
            </form>
        </div>
    </div>
</div>
        `
})

export class Home {
    loginFormVisible:boolean
    registerFormVisible:boolean

    constructor(){
        this.loginFormVisible=false;
        this.registerFormVisible=false;
    }

    login() {
        if(this.loginFormVisible){
            this.loginFormVisible=false;
        } else {
            this.loginFormVisible=true;
        }
    }

    register() {
        if(this.registerFormVisible){
            this.registerFormVisible=false;
        } else {
            this.registerFormVisible=true;
        }
    }

}
