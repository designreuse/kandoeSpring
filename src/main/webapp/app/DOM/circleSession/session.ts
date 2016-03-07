
export class Session {
    sessionId: number;
    sessionMode: string;
    sessionType: string;
    maxCards: number;
    minCards: number;

    constructor(){

    }

    static fromJson(json: any): Session {
        var session = new Session();
        session.sessionId = json.sessionId;
        session.sessionMode = json.sessionMode;
        session.sessionType = json.sessionType;
        session.maxCards = json.maxCards;
        session.minCards = json.minCards;

        return session;
    }
}