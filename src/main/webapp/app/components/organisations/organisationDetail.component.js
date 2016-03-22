System.register(['angular2/core', "../../DOM/organisation", "../../service/organisationService", "angular2/router", "../../security/TokenHelper", "../../DOM/users/user", "../../service/userService", "../../DOM/theme", "../../service/cardService", "../../DOM/card", "../../service/themeService", "../../service/subThemeService", "../../DOM/subTheme"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, organisation_1, organisationService_1, router_1, TokenHelper_1, user_1, userService_1, theme_1, cardService_1, card_1, themeService_1, subThemeService_1, subTheme_1;
    var OrganisationDetailComponent;
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
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (themeService_1_1) {
                themeService_1 = themeService_1_1;
            },
            function (subThemeService_1_1) {
                subThemeService_1 = subThemeService_1_1;
            },
            function (subTheme_1_1) {
                subTheme_1 = subTheme_1_1;
            }],
        execute: function() {
            OrganisationDetailComponent = (function () {
                function OrganisationDetailComponent(orgService, routeParams, subThemeService, themeService, cardService, userService, router) {
                    this.router = router;
                    this.organisation = organisation_1.Organisation.createEmpty();
                    this.organisers = [];
                    this.members = [];
                    this.themes = [];
                    this.theme = theme_1.Theme.createEmpty();
                    this.cards = [];
                    this.card = card_1.Card.createEmpty();
                    this.subTheme = subTheme_1.SubTheme.createEmpty();
                    this.subThemes = [];
                    this.newMember = "";
                    this.newOrganiser = "";
                    this.user = user_1.User.createEmpty();
                    this.file = null;
                    this.organisationService = orgService;
                    this.orgId = +routeParams.params["id"];
                    this.userService = userService;
                    this.cardService = cardService;
                    this.themeService = themeService;
                    this.subThemeService = subThemeService;
                    this.organisation = orgService.getOrganisationById(this.orgId);
                    this.themeId = this.organisation.themeId;
                }
                OrganisationDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.organisationService.getOrganisationById(this.orgId).subscribe(function (org) {
                        _this.organisation = org;
                        _this.organisation.logoUrl = org.logoUrl;
                    });
                    this.organisationService.getOrganisationOrganisers(this.orgId).subscribe(function (users) {
                        _this.organisers = users;
                    });
                    this.organisationService.getOrganisationMembers(this.orgId).subscribe(function (users) {
                        _this.members = users;
                    });
                    this.organisationService.getOrganisationThemes(this.orgId).subscribe(function (themes) {
                        _this.themes = themes;
                        for (var i = 0; i < themes.length; i++) {
                            _this.themeService.getThemeCards(themes[i].themeId).subscribe(function (cards) {
                                _this.cards = cards;
                            });
                            _this.themeService.getThemeSubThemes(themes[i].themeId).subscribe(function (subThemes) {
                                _this.subThemes = subThemes;
                            });
                        }
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                    });
                };
                /*
                 ----------------------- ADD USER ---------------------------------------
                 */
                OrganisationDetailComponent.prototype.showAddUser = function () {
                    event.preventDefault();
                    var self = event.target;
                    $(self).toggleClass('hide-add');
                    if ($(self).hasClass('hide-add')) {
                        $('.add-user').closest('.row').slideUp(100);
                    }
                    else {
                        $('.add-user').closest('.row').slideDown(100);
                    }
                };
                OrganisationDetailComponent.prototype.addMember = function () {
                    var _this = this;
                    if (this.newMember) {
                        this.organisationService.addMemberToOrganisation(this.orgId, this.newMember).subscribe(function (u) {
                            _this.members.push(u);
                            _this.newMember = "";
                        });
                    }
                };
                /*
                 ----------------------- ADD ORGANISATION ---------------------------------------
                 */
                OrganisationDetailComponent.prototype.showAddOrg = function () {
                    event.preventDefault();
                    var self = event.target;
                    $(self).toggleClass('hide-add');
                    if ($(self).hasClass('hide-add')) {
                        $('.add-org').closest('.row').slideUp(100);
                    }
                    else {
                        $('.add-org').closest('.row').slideDown(100);
                    }
                };
                OrganisationDetailComponent.prototype.addOrganiser = function () {
                    var _this = this;
                    if (this.newOrganiser) {
                        this.organisationService.addOrganiserToOrganisation(this.orgId, this.newOrganiser).subscribe(function (u) {
                            _this.organisers.push(u);
                            if (_this.members.find(function (user) { return user.username === u.username; })) {
                                var index = _this.members.indexOf(u);
                                _this.members.splice(index, 1);
                            }
                            _this.newOrganiser = "";
                        });
                    }
                };
                /*
                 ------------------------- CARD COMPONENT ------------------------------------
                 */
                OrganisationDetailComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.card.description) {
                        this.card.themeId = this.themeId;
                        this.cardService.createCard(this.card, this.file).subscribe(function (c) {
                            _this.card.description = null;
                            _this.file = null;
                            _this.cards.push(c);
                        }, function (error) {
                            _this.file = null;
                            console.log(error);
                        });
                    }
                };
                OrganisationDetailComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("cardimg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                OrganisationDetailComponent.prototype.onAddCard = function (themeId) {
                    this.card.themeId = themeId;
                    this.themeId = themeId;
                };
                /*
                 --------------------- SUBTHEME COMPONENT ---------------------
                 */
                OrganisationDetailComponent.prototype.onAddSubTheme = function (themeId) {
                    this.subTheme.themeId = themeId;
                    this.themeId = themeId;
                };
                OrganisationDetailComponent.prototype.onSubmitSubTheme = function () {
                    var _this = this;
                    if (this.subTheme.description) {
                        this.subThemeService.createSubTheme(this.subTheme, this.file).subscribe(function (st) {
                            _this.theme.subThemes.push(st);
                            _this.subTheme.subThemeName = null;
                            _this.subTheme.description = null;
                            _this.file = null;
                            var cardIds = [];
                            var i = 0;
                            $("input:checked").each(function () {
                                cardIds[i] = $(this).val();
                                console.log($(this).val());
                                console.log(cardIds[i]);
                                i++;
                            });
                            _this.subThemeService.addCardsToSubTheme(cardIds, st.subThemeId).subscribe(function (subt) {
                                console.log(subt);
                            });
                        }, function (error) {
                            _this.file = null;
                            console.log(error);
                        });
                    }
                };
                OrganisationDetailComponent.prototype.addCardsSubTheme = function () {
                    var _this = this;
                    var cardIds = Array();
                    var i = 0;
                    $("input:checked").each(function () {
                        cardIds[i++] = $(this).val();
                        console.log($(this).val());
                    });
                    var newSubThemeId = this.theme.subThemes.length + 1;
                    this.subThemeService.addCardsToSubTheme(cardIds, newSubThemeId).subscribe(function (subTheme) {
                        _this.subTheme = subTheme;
                        console.log(newSubThemeId);
                        /*   this.cards = subTheme.cards;*/
                    }, function (e) {
                        alert(e.text());
                    });
                };
                OrganisationDetailComponent.prototype.onFileChangeSubTheme = function ($event) {
                    this.file = $event.target.files[0];
                    var output = document.getElementById("subthemeImg");
                    output.src = URL.createObjectURL($event.target.files[0]);
                };
                /*
                 ----------------------- GENERAL ---------------------------------------
                 */
                OrganisationDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                OrganisationDetailComponent.prototype.getImageSrc = function (url) {
                    if (url) {
                        if (url.indexOf("http://") > -1) {
                            return url;
                        }
                        else {
                            return url.replace(/"/g, "");
                        }
                    }
                    else {
                        return "./app/resources/noimgplaceholder.png";
                    }
                };
                OrganisationDetailComponent.prototype.rotateCard = function ($event) {
                    var card = $event.target;
                    var container = $(card).closest('.themeCard-container');
                    console.log(container);
                    if (container.hasClass('hover')) {
                        container.removeClass('hover');
                    }
                    else {
                        container.addClass('hover');
                    }
                };
                OrganisationDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: "organisation-detail",
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        templateUrl: 'app/components/organisations/organisationDetail.html'
                    }), 
                    __metadata('design:paramtypes', [organisationService_1.OrganisationService, (typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, subThemeService_1.SubThemeService, themeService_1.ThemeService, cardService_1.CardService, userService_1.UserService, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
                ], OrganisationDetailComponent);
                return OrganisationDetailComponent;
                var _a, _b;
            })();
            exports_1("OrganisationDetailComponent", OrganisationDetailComponent);
        }
    }
});
//# sourceMappingURL=organisationDetail.component.js.map