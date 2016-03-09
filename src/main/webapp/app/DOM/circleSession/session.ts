import {Card} from "../card";
import {User} from "../users/user";
export class Session {
    sessionId: number;
    mode: string;
    type: string;
    minCards: number;
    maxCards: number;
    size: number;
    startTime: Date;
    endTime: Date;
    userAddCards: boolean;
    themeId: number;
    cards: Card[];
    users: User[];

    constructor() {

    }

    static fromJson(json: any): Session {
        var session = new Session();
        session.sessionId = json.sessionId;
        session.mode = json.mode;
        session.type = json.type;
        session.minCards = json.minCards;
        session.maxCards = json.maxCards;
        //dates might not work
        session.startTime = new Date(json.startTime);
        session.endTime = new Date(json.endTime);
        session.size = json.size;
        session.userAddCards = json.userAddCards;
        session.themeId = json.themeId;

        if(json.cards) {
            session.cards = [];
            for(var i = 0; i < json.cards.length; i++){
                session.cards[i] = Card.fromJson(json.cards[i]);
            }
        }

        if(json.users){
            session.users = [];
            for(var i = 0; i < json.users.lenth; i++){
                session.users[i] = User.fromJson(json.users[i]);
            }
        }

        return session;
    }

    static createEmpty(): Session {
        var session = new Session();
        return session;
    }
}