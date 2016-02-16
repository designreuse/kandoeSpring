import {Component} from "angular2/core";

@Component({
    selector: 'home',
    template: `

<div class="home">
    <h1 class="jumbotron">Welcome to Kandoe</h1>
    <p class="jumbotron">Free platform for making decisions <br>
        Easy to use<br>
        You can participate with a lot of people</p>
    <button (click)="login()">Log in</button>
    <button (click)="register()">Register</button>

     `
})

export class Home {
    login(){
        alert("nu ga je naar login pagina");
    }
    register(){
        alert("nu ga je registreren");
    }

}
