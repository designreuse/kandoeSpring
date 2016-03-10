import {Address} from "./address";
/**
 * Created by amy on 16/02/2016.
 */
export class Person {
    public firstname: string;
    public lastname: string;
    public address: Address;

    static fromJson(json: any): Person {
        var person = new Person();

        person.address = new Address();
        if(json.address){
            person.address = Address.fromJson(json.address);
        }

        person.firstname = json.firstname;
        person.lastname = json.lastname;

        return person;
    }
}