export class Message {
    public username: string;
    public content: string;
    public userpicture : string;
    public date: Date;

    static fromJson(json: any): Message {
        var message = new Message();
        message.username = json.username;
        message.content = json.content;
        message.userpicture = json.userpicture;
        message.date = json.date;
        return message;
    }
}
