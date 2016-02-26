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
    <div class="panel-body container">
    	<div class="row">
			<div class="col-xs-12 col-sm-offset-2 col-sm-8">
				<ul>
				    <div *ngFor="#organisation of organisations" class="event-list col-1-4">
                    <!--<p>OrganisationID : {{organisation.organisationId}}</p>-->
					<li>
						<img alt="KdG" src="organisation.logoUrl" />
						<div class="info">
							<h2 class="title">{{organisation.organisationId}} {{organisation.organisationName}}</h2>
							<p class="desc">{{organisation.address}}</p>
						</div>
						<div class="social">
							<ul>
								<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
								<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>
								<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>
							</ul>
						</div>
					</li>
					</div>
				</ul>
			</div>
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