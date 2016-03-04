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
    public facebookAccount: boolean;

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
        var address = new Address();
        address.city = json.person.address.city;
        address.number = json.person.address.number;
        address.street = json.person.address.street;
        address.zip = json.person.address.zip;
        person.address = address;
        person.firstname = json.person.firstname;
        person.lastname = json.person.lastname;
        user.person = person;

        if(json.facebookAccount){
            user.facebookAccount = json.facebookAccount;
        }

        return user;
    }
}