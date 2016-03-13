export class Message {
    public username: string;
    public content: string;
    public date: Date;

    static fromJson(json: any): Message {
        var message = new Message();
        message.username = json.username;
        message.content = json.content;

        return message;
    }
}
