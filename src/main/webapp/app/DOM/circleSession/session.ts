import {Card} from "../card";
import {User} from "../users/user";
import {Theme} from "../theme";
import {SubTheme} from "../subTheme";

export class Session {
    sessionId: number;
    sessionName: string;
    mode: string;
    type: string;
    state: string;
    minCards: number;
    maxCards: number;
    size: number;
    startTime: Date;
    endTime: Date;
    userAddCards: boolean;
    chosenCards: boolean;
    themeId: number;
    subThemeId: number;
    cards: Card[];
    users: User[];
    theme: Theme;
    subTheme:SubTheme;
    isOrganiser: boolean;

    constructor() {

    }

    static fromJson(json: any): Session {
        var session = new Session();
        session.sessionId = json.sessionId;
        session.sessionName = json.sessionName;
        session.mode = json.mode;
        session.type = json.type;
        session.minCards = json.minCards;
        session.maxCards = json.maxCards;
        session.size = json.size;
        session.userAddCards = json.userAddCards;
        session.chosenCards = json.chosenCards;
        session.themeId = json.themeId;
        session.subThemeId = json.subThemeId;
        session.state = json.state;

        session.isOrganiser = json.organiser;
        session.startTime = new Date(json.startTime);
        session.endTime = new Date(json.endTime);

        if(json.cards) {
            session.cards = [];
            for(var i = 0; i < json.cards.length; i++){
                session.cards[i] = Card.fromJson(json.cards[i]);
            }
        }

        if(json.users){
            session.users = [];
            for(var i = 0; i < json.users.length; i++){
                session.users[i] = User.fromJson(json.users[i]);
            }
        }

        if(json.theme){
            session.theme = Theme.fromJson(json.theme);
        }

        if(json.subTheme){
            session.subTheme=SubTheme.fromJson(json.subTheme);
        }

        return session;
    }

    static createEmpty(): Session {
        var session = new Session();
        session.theme = Theme.createEmpty();
        session.subTheme=SubTheme.createEmpty();
        return session;
    }
}