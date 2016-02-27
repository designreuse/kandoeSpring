import {Person} from "./person";
import {Address} from "./address";
/**
 * Created by amy on 16/02/2016.
 */
export class User {
    public username: string;
    public password: string;
    public passwordConfirm: string;
    public oldPassword: string;
    public email: string;
    public person: Person;

    constructor(){

    }

    static createEmpty(): User{
        var user =new User;
        var person = new Person();
        var address = new Address();
        person.address = address;
        user.person = person;
        return user;
    }

    static fromJson(json: any): User {
        var user = new User();
        user.username = json.username;
        user.email = json.email;
        var person = new Person();
        person.firstname = json.person.firstname;
        user.person = person;

        return user;
    }
}