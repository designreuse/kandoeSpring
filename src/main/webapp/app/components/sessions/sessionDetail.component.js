System.register(['angular2/core', "../../security/TokenHelper", "angular2/router", "../../service/sessionService", "../../DOM/card", "../../DOM/circleSession/session", "../../service/userService", "../../DOM/users/user", "../../service/cardService", "../chat/chatComponent", "../../DOM/circleSession/message"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, TokenHelper_1, router_1, sessionService_1, card_1, session_1, userService_1, user_1, cardService_1, chatComponent_1, message_1;
    var SessionDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TokenHelper_1_1) {
                TokenHelper_1 = TokenHelper_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sessionService_1_1) {
                sessionService_1 = sessionService_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (cardService_1_1) {
                cardService_1 = cardService_1_1;
            },
            function (chatComponent_1_1) {
                chatComponent_1 = chatComponent_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            SessionDetailComponent = (function () {
                function SessionDetailComponent(sesService, userService, cardService, router, routeParams) {
                    this.session = session_1.Session.createEmpty();
                    this.size = [];
                    this.cards = [card_1.Card.createEmpty()];
                    this.users = [];
                    this.user = user_1.User.createEmpty();
                    this.card = card_1.Card.createEmpty();
                    this.file = null;
                    this.canPlay = false;
                    this.messages = [];
                    this.sessionService = sesService;
                    this.router = router;
                    this.sessionId = +routeParams.params["id"];
                    this.userService = userService;
                    this.cardService = cardService;
                    this.connect();
                }
                SessionDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sessionService.getSessionById(this.sessionId).subscribe(function (s) {
                        _this.session = s;
                        var j = s.size;
                        for (var i = 0; i < s.size; i++) {
                            _this.size[i] = --j;
                        }
                        _this.cards = s.cards;
                        _this.users = s.users;
                    }, function (e) {
                        _this.router.navigate(["/LoggedInHome"]);
                    });
                    this.userService.getCurrentUser().subscribe(function (u) {
                        _this.user = u;
                        _this.sessionService.checkCanPlay(_this.sessionId).subscribe(function (r) {
                            console.log(r.json());
                            _this.canPlay = r.json();
                        });
                    });
                    this.sessionService.getChatHistory(this.sessionId).subscribe(function (messages) {
                        console.log(JSON.stringify(messages));
                        _this.messages = messages;
                    }, function (e) {
                        console.log(e.text());
                    });
                };
                /*
                ------------------------------------ USER PLAYING ---------------------------
                 */
                SessionDetailComponent.prototype.getVisibility = function (userId) {
                    var currUser = null;
                    for (var j = 0; j < this.users.length; j++) {
                        var u = this.users[j];
                        if (u.userId == userId) {
                            currUser = u;
                        }
                    }
                    if (currUser.position == 0) {
                        return ("visibility: visible");
                    }
                    else {
                        return ("visibility: hidden");
                    }
                };
                /*
                ------------------------------------ CIRCLE CARDS POSITIONING ---------------------------
                 */
                SessionDetailComponent.prototype.getPosition = function (i, cardId) {
                    var c = this.cards[i];
                    var position = this.session.size - 1 - c.position;
                    var id = "#" + i;
                    var el = $(document).find($(id));
                    var elWidthPx = $(el).css("width");
                    var elWidth = parseInt(elWidthPx, 10);
                    var elHeightPx = $(el).css("height");
                    var elHeight = parseInt(elHeightPx, 10);
                    var circle = document.getElementById("circle-" + position);
                    var radius = Number($(circle).attr("r"));
                    var rotationDegree = 360 / (this.cards.length);
                    var step = (2 * Math.PI) / this.cards.length;
                    var middleWidth = this.calculateWidthCentre();
                    var middleHeight = this.calculateHeightCentre();
                    var x = Math.round(middleWidth + radius * Math.cos(step * i) - (elWidth + 10) / 2);
                    var y = Math.round(middleHeight + radius * Math.sin(step * i) - (elWidth + 20) / 2);
                    return "top:" + y + "px; left: " + x + "px; transform: rotate(" + (90 + (rotationDegree * i)) + "deg)";
                };
                SessionDetailComponent.prototype.changePosition = function (i) {
                    if (this.session.state == "IN_PROGRESS") {
                        var card = this.cards[i];
                        var id = "#" + i;
                        var el = $(document).find($(id));
                        var stopId = "#play-" + this.user.userId;
                        var stopped = $(document).find($(stopId));
                        var next = null;
                        for (var j = 0; j < this.users.length; j++) {
                            var u = this.users[j];
                            if (u.position == 1) {
                                next = u;
                            }
                        }
                        var playId = "#play-" + (u.userId);
                        var playing = $(document).find($(playId));
                        $(playing).css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 2000);
                        $(stopped).css({ opacity: 1.0, visibility: "hidden" }).animate({ opacity: 0.0 }, 2000);
                        if (card.position < (this.session.size - 1) && this.canPlay) {
                            this.stompClient.send("/move", {}, JSON.stringify({ 'token': localStorage.getItem("id_token"),
                                'sessionId': this.sessionId, 'cardId': card.cardId }));
                            $(el).load("sessionDetail.html");
                        }
                        else if (card.position == (this.session.size - 1)) {
                            $(document).find("#card-element-winner").text(card.description);
                            var img = $(document).find("#card-img-winner");
                            img.attr("src", this.getImageSrc(card.imageURL));
                            var popup = $(document).find("#winner-popup");
                            $(popup).css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 2500);
                        }
                    }
                };
                SessionDetailComponent.prototype.calculateWidthCentre = function () {
                    var width = document.getElementById("circlesvg").getBoundingClientRect().width;
                    return width / 2;
                };
                SessionDetailComponent.prototype.calculateHeightCentre = function () {
                    var height = document.getElementById("circlesvg").getBoundingClientRect().height;
                    return height / 2;
                };
                /*
                -------------------------------- GENERAL --------------------------------
                 */
                SessionDetailComponent.prototype.getImageSrc = function (url) {
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
                SessionDetailComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.router.navigate(['/Home']);
                };
                /*
                ----------------------------------- ADD CARD ----------------------------------------
                 */
                SessionDetailComponent.prototype.onAddCard = function () {
                    var _this = this;
                    this.card.themeId = +this.session.theme.themeId;
                    this.cardService.createCard(this.card, this.file).subscribe(function (res) {
                        _this.file = null;
                        _this.session.theme.cards.push(res);
                    });
                };
                SessionDetailComponent.prototype.onFileChange = function ($event) {
                    this.file = $event.target.files[0];
                };
                /*
                ----------------------------------- CARD SELECTION ----------------------------------
                 */
                SessionDetailComponent.prototype.onSelectCard = function ($event) {
                    this.countChecked();
                };
                SessionDetailComponent.prototype.countChecked = function () {
                    var count = $("input:checked").length;
                    if (count >= this.session.maxCards) {
                        $("input:checkbox:not(:checked)").prop('disabled', true);
                    }
                    else {
                        $("input:checkbox:not(:checked)").prop('disabled', false);
                    }
                };
                SessionDetailComponent.prototype.onChooseCards = function () {
                    var count = $("input:checked").length;
                    if (count >= this.session.minCards) {
                        var cardIds = Array();
                        var i = 0;
                        $("input:checked").each(function () {
                            cardIds[i++] = $(this).val();
                            console.log($(this).val());
                        });
                        this.session.chosenCards = true;
                        this.stompClient.send("/addCards", {}, JSON.stringify({ 'token': localStorage.getItem("id_token"),
                            'sessionId': this.sessionId, 'cardIds': cardIds }));
                    }
                };
                /*
                 ------------------------- CARD DESCRIPTION SLIDE-OVER -------------------------
                 */
                SessionDetailComponent.prototype.showFullDescription = function (i) {
                    var id = "#" + i;
                    var descid = "#desc-" + i;
                    var cardIngame = $(document).find($(id));
                    var carddescription = $(document).find($(descid));
                    cardIngame.css("background", "rgb(255, 156, 68)");
                    cardIngame.css("color", "white");
                    carddescription.css("display", "inherit");
                };
                SessionDetailComponent.prototype.hideFullDescription = function (i) {
                    var id = "#" + i;
                    var descid = "#desc-" + i;
                    var cardIngame = $(document).find($(id));
                    var carddescription = $(document).find($(descid));
                    cardIngame.css("background", "rgba(255, 255, 255, 0.6)");
                    cardIngame.css("color", "rgb(0,0,0)");
                    carddescription.css("display", "none");
                };
                SessionDetailComponent.prototype.endSession = function () {
                    var cardId = $("input:checked").val();
                    console.log(cardId);
                    this.stompClient.send("/endSession", {}, JSON.stringify({ 'sessionId': this.sessionId, 'cardId': cardId,
                        'token': localStorage.getItem("id_token") }));
                };
                /*
                -------------------------------WebSockets-------------------------------------
                */
                SessionDetailComponent.prototype.connect = function () {
                    var _this = this;
                    this.disconnect();
                    //var socket = new SockJS('/Kandoe/circleSession'); //local
                    var socket = new SockJS('/circleSession'); // wildfly
                    this.stompClient = Stomp.over(socket);
                    this.stompClient.connect({}, function (frame) {
                        _this.stompClient.subscribe('/topic/chat', function (greeting) {
                            _this.showMessage(JSON.parse(greeting.body));
                        });
                        _this.stompClient.subscribe('/topic/move', function (result) {
                            var resultii = JSON.parse(result.body);
                            var ii;
                            var card;
                            for (var i = 0; i < _this.cards.length; i++) {
                                if (_this.cards[i].cardId == resultii.cardId) {
                                    ii = i;
                                    card = _this.cards[i];
                                }
                            }
                            var playId = "#play-" + resultii.nextUserId;
                            var stopId = "#play-" + _this.user.userId;
                            var playing = $(document).find($(playId));
                            var stopped = $(document).find($(stopId));
                            $(playing).css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 2000);
                            $(stopped).css({ opacity: 1.0, visibility: "hidden" }).animate({ opacity: 0.0 }, 2000);
                            _this.canPlay = resultii.nextUserId == _this.user.userId;
                            var id = "#" + ii;
                            var el = $(document).find($(id));
                            card.position = card.position + 1;
                            if (card.position < (_this.session.size - 1)) {
                                $(el).load("sessionDetail.html");
                            }
                            else if (card.position == (_this.session.size - 1)) {
                                $(document).find("#card-element-winner").text(card.description);
                                var img = $(document).find("#card-img-winner");
                                img.attr("src", _this.getImageSrc(card.imageURL));
                                var popup = $(document).find("#winner-popup");
                                $(popup).css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 2500);
                            }
                        });
                        _this.stompClient.subscribe('/topic/addCards', function (result) {
                            var json = JSON.parse(result.body);
                            var session = session_1.Session.fromJson(json);
                            var chosen = _this.session.chosenCards;
                            _this.session = session;
                            _this.cards = session.cards;
                            _this.users = session.users;
                            _this.session.chosenCards = chosen;
                        });
                        _this.stompClient.subscribe('/topic/endSession', function (result) {
                            var json = JSON.parse(result.body);
                            if (json.sessionId == _this.sessionId) {
                                _this.cardService.getCardById(json.cardId).subscribe(function (card) {
                                    $(document).find("#card-element-session-ended").text(card.description);
                                    var img = $(document).find("#card-img-session-ended");
                                    img.attr("src", _this.getImageSrc(card.imageURL));
                                    $(document).find("#card-element-session-finished").text(card.description);
                                    var img = $(document).find("#card-img-session-finished");
                                    img.attr("src", _this.getImageSrc(card.imageURL));
                                });
                                var popup = $(document).find("#session-ended-popup");
                                $(popup).css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 2500);
                            }
                        });
                    });
                };
                SessionDetailComponent.prototype.disconnect = function () {
                    if (this.stompClient != null) {
                        this.stompClient.disconnect();
                    }
                };
                SessionDetailComponent.prototype.sendMessage = function (message) {
                    var token = localStorage.getItem("id_token");
                    this.stompClient.send("/chat", {}, JSON.stringify({ 'content': message, 'token': token, 'sessionId': this.sessionId }));
                };
                SessionDetailComponent.prototype.showMessage = function (json) {
                    this.messages.push(message_1.Message.fromJson(json));
                };
                SessionDetailComponent.prototype.reloadGame = function () {
                    location.reload();
                };
                SessionDetailComponent = __decorate([
                    router_1.CanActivate(function () { return TokenHelper_1.tokenNotExpired(); }),
                    core_1.Component({
                        selector: 'session-detail',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, chatComponent_1.ChatComponent],
                        templateUrl: 'app/components/sessions/sessionDetail.html',
                    }), 
                    __metadata('design:paramtypes', [sessionService_1.SessionService, userService_1.UserService, cardService_1.CardService, router_1.Router, router_1.RouteParams])
                ], SessionDetailComponent);
                return SessionDetailComponent;
            })();
            exports_1("SessionDetailComponent", SessionDetailComponent);
        }
    }
});
//# sourceMappingURL=sessionDetail.component.js.map