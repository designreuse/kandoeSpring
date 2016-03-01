System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", 'angular2/router', "../../security/TokenHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1, TokenHelper_1;
    var AddOrganisationComponent;
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (organisation_1_1) {
                organisation_1 = organisation_1_1;
            },
            function (organisationService_1_1) {
                organisationService_1 = organisationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            }],
        execute: function() {
            AddOrganisationComponent = (function () {
                function AddOrganisationComponent(orgService, router) {
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.file = null;
                    this.organisationService = orgService;
                    this.router = router;
                }
                AddOrganisationComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                AddOrganisationComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.organisationService.createOrganisation(this.organisation, this.file).subscribe(function (res) {
                        _this.router.navigate(['/Organisations']);
                        _this.file = null;
                    }, function (error) {
                        //todo change error display
                        _this.file = null;
                        alert(error.text());
                    });
                };
                AddOrganisationComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'add-organisation',
                        template: "\n    <header>\n        <div class=\"container clearfix\">\n            <h3><span class=\"glyphicon glyphicon-plus-sign\"></span> Add new organisation</h3>\n        </div>\n    </header>\n    <div class=\"container main\">\n        <form  class=\"col-lg-offset-2 col-lg-8\" method=\"post\" role=\"form\">\n            <div class=\"form-padadd-org\">\n\n                <div class=\"form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" placeholder=\"Enter organisation name\" class=\"form-control\" [(ngModel)]=\"organisation.organisationName\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Address</label>\n                    <input type=\"text\" placeholder=\"Enter address\" class=\"form-control\" [(ngModel)]=\"organisation.address\">\n                </div>\n                <div class=\"form-group\">\n                    <label>Logo</label>\n                    <input type=\"file\" multiple=\"false\" (change)=\"onFileChange($event)\">\n                </div>\n                <div class=\"items\">\n                    <div class=\"item\">\n                        <div class=\"id\"><p>1</p></div>\n                        <img alt=\"logo\" [src]=\"getImageSrc(organisation.logoUrl, organisation.organisationId)\" />\n                        <div class=\"info\">\n                            <h2 class=\"title\">{{organisation.organisationName}}</h2>\n                            <p class=\"desc\">{{organisation.address}}</p>\n                        </div>\n                        <div class=\"social\">\n                            <ul>\n                                <li class=\"facebook\" style=\"width:33%;\"><a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a></li>\n                                <li class=\"twitter\" style=\"width:34%;\"><a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a></li>\n                                <li class=\"google-plus\" style=\"width:33%;\"><a href=\"#google-plus\"><span class=\"fa fa-google-plus\"></span></a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn btn-lg btn-info glyphicon glyphicon-plus\" (click)=\"onSubmit()\"> Create new organisation</button>\n            </div>\n        </form>\n\n    <form id=\"form1\" runat=\"server\">\n        <input type='file' id=\"imgInp\" />\n        <br>\n        <img id=\"blah\" src=\"http://i.imgur.com/zAyt4lX.jpg\" alt=\"your image\" height=\"100\" />\n    </form>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], AddOrganisationComponent);
                return AddOrganisationComponent;
                var _a;
            })();
            exports_1("AddOrganisationComponent", AddOrganisationComponent);
            $("#imgInp").change(function () {
                readURL(this);
            });
        }
    }
});
//# sourceMappingURL=addOrganisation.component.js.map