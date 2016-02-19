import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Service} from "../service/service";
import {Router} from "angular2/router";
import {Theme} from "../DOM/Theme";
/**
 * Created by Jordan on 19/02/2016.
 */

@Component({
    selector: 'Theme',
    template: `
        <div>
            <h1>Current themes</h1>
        </div>
        <div class="panel-body">
            <div *ngFor="#theme of themes" class="col-1-4">
                  <p>themeId : {{theme.themeId}}</p>
            </div>
        </div>
    `,

    inputs: ['']
})

export class ThemeComponent  implements OnInit {
    public themes:Theme[] = [];

    constructor(private _service:Service, private _router:Router) {
    }

    ngOnInit() {
        this._service.getThemes().subscribe((themes:Theme[])=> this.themes = themes);
        console.log(this.themes.length);
    }
}