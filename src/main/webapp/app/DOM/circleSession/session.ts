import {Card} from "../card";
export class Session {
    private sessionId: number;
    private mode: string;
    private type: string;
    private minCards: number;
    private maxCards: number;
    private size: number;
    private startTime: Date;
    private endTime: Date;
    private userAddCards: boolean;
    private cards: Card[];

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

        if(json.cards) {
            session.cards = [];
            for(var i = 0; i < json.cards.length; i++){
                session.cards[i] = Card.fromJson(json.cards[i]);
            }
        }

        return session;
    }
}