/**
 * Created by amy on 19/02/2016.
 */

import {Component, OnInit} from 'angular2/core'
import {Router} from 'angular2/router'
import {User} from "../DOM/users/user";
import {UserService} from "../service/userService";

@Component({
    selector: 'kandoeCard',
    template: `
         <div class="col-md-4">
            <div class="card">
                <div class="card-image">
                    <img src="https://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg" class="img-responsive">
                    <div class="caption post-content">
                        <h3 style="color:#f9f9f9">Birds</h3>
                    </div>
                </div><!-- card image -->

                <div class="card-content">
                    <span class="card-title">Title</span>
                   <button type="button" class="btn btn-custom pull-right show-btn" data-rel="1" aria-label="Left Align" (click)="show()">
                        <i class="fa fa-ellipsis-v"></i>
                    </button>
                </div><!-- card content -->
                <div class="row">
                <div class="card-action col-sm-12">
                   <div class="col-sm-2"><label><span class="glyphicon glyphicon-user"></span> 4</label></div>
                    <div class="col-sm-4"><label><span class="glyphicon glyphicon-time"></span> 5h20m</label></div>
                    <div class="col-sm-4"><label><span class="glyphicon glyphicon-bookmark"></span> Birds</label></div>
                    <div class="col-sm-2"><button type="button" class="btn btn-custom pull-right"><span class="glyphicon glyphicon-chevron-right"></span></button></div>
                </div><!-- card actions -->
                </div>
               <div class="card-reveal" data-rel="1">
                    <span class="card-title">Card Title</span> <button type="button" class="close" data-rel="1" data-dismiss="modal" aria-label="Close" (click)="close()"><span aria-hidden="true">×</span></button>
                    <h4>Subtitle</h4>
                    <ul>
                   <li> More information</li>
                    </ul>
                </div><!-- card reveal -->
            </div>
        </div>
    `
})

export class KandoeCard {
    private router:Router;

    constructor(router:Router) {
        this.router = router;
    }

    ngOnInit() {
        $('.show-btn').on('click', function () {
            $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
        });

        $('.card-reveal .close').on('click', function () {
            $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
        });
    }


}
