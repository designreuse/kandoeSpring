System.register(["angular2/core", "../service/service", "angular2/router"], function(exports_1) {
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
    var core_1, service_1, router_1;
    var ThemeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /**
             * Created by Jordan on 19/02/2016.
             */
            ThemeComponent = (function () {
                function ThemeComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.themes = [];
                }
                ThemeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._service.getThemes().subscribe(function (themes) { return _this.themes = themes; });
                    console.log(this.themes.length);
                };
                ThemeComponent = __decorate([
                    core_1.Component({
                        selector: 'Theme',
                        template: "\n        <div>\n            <h1>Current themes</h1>\n        </div>\n        <div class=\"panel-body\">\n            <div *ngFor=\"#theme of themes\" class=\"col-1-4\">\n                  <p>themeId : {{theme.themeId}}</p>\n            </div>\n        </div>\n    ",
                        inputs: ['']
                    }), 
                    __metadata('design:paramtypes', [service_1.Service, router_1.Router])
                ], ThemeComponent);
                return ThemeComponent;
            })();
            exports_1("ThemeComponent", ThemeComponent);
        }
    }
});
//# sourceMappingURL=ThemeComponent.js.map