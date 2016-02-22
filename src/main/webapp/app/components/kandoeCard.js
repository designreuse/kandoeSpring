/**
 * Created by amy on 19/02/2016.
 */
System.register(['angular2/core', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var KandoeCard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            KandoeCard = (function () {
                function KandoeCard(router) {
                    this.router = router;
                }
                KandoeCard.prototype.ngOnInit = function () {
                    $('.show-btn').on('click', function () {
                        $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
                    });
                    $('.card-reveal .close').on('click', function () {
                        $('div.card-reveal[data-rel=' + $(this).data('rel') + ']').slideToggle('slow');
                    });
                };
                KandoeCard = __decorate([
                    core_1.Component({
                        selector: 'kandoeCard',
                        template: "\n            <div class=\"col-md-3\">\n            <div class=\"card\">\n                <div class=\"card-image\">\n                    <img src=\"http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg\" class=\"img-responsive\">\n                    <div class=\"caption post-content\">\n                        <h3 style=\"color:#f9f9f9\">Birds</h3>\n                    </div>\n                </div><!-- card image -->\n\n                <div class=\"card-content\">\n                    <span class=\"card-title\">Title</span>\n                   <button type=\"button\" class=\"btn btn-custom pull-right show-btn\" data-rel=\"1\" aria-label=\"Left Align\" (click)=\"show()\">\n                        <i class=\"fa fa-ellipsis-v\"></i>\n                    </button>\n                </div><!-- card content -->\n                <div class=\"row\">\n                <div class=\"card-action col-sm-12\">\n                   <div class=\"col-sm-2\"><label><span class=\"glyphicon glyphicon-user\"></span> 4</label></div>\n                    <div class=\"col-sm-4\"><label><span class=\"glyphicon glyphicon-time\"></span> 5h20m</label></div>\n                    <div class=\"col-sm-4\"><label><span class=\"glyphicon glyphicon-bookmark\"></span> Birds</label></div>\n                    <div class=\"col-sm-2\"><button type=\"button\" class=\"btn btn-custom pull-right\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button>\n                </div><!-- card actions -->\n                </div>\n               <div class=\"card-reveal\" data-rel=\"1\">\n                    <span class=\"card-title\">Card Title</span> <button type=\"button\" class=\"close\" data-rel=\"1\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"close()\"><span aria-hidden=\"true\">\u00D7</span></button>\n                    <h4>Subtitle</h4>\n                    <ul>\n                   <li> More information</li>\n                    </ul>\n                </div><!-- card reveal -->\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], KandoeCard);
                return KandoeCard;
                var _a;
            })();
            exports_1("KandoeCard", KandoeCard);
        }
    }
});
//# sourceMappingURL=kandoeCard.js.map