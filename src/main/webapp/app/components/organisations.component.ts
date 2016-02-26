/**
 * Created by michaelkees on 12/02/16.
 */
import {Component, OnInit} from 'angular2/core'
import {Router} from 'angular2/router'
import {Organisation} from "../DOM/organisation";
import {Service} from "../service/service";

@Component({
    selector: 'organisations',
    template: `
    <p>test</p>
    <div class="panel-body">
            <div *ngFor="#organisation of organisations" class="col-1-4">
                  <p>OrganisationID : {{organisation.organisationId}}</p>
            </div>
    </div>`,
    inputs: ['organisations']
})

export class OrganisationsComponent implements OnInit {
    public organisations:Organisation[] = [];

    constructor(private _service:Service, private _router:Router) {
    }

    ngOnInit() {
        this._service.getAllOrganisations().subscribe((organisations:Organisation[])=> this.organisations = organisations);
       console.log(this.organisations.length);
    }

}