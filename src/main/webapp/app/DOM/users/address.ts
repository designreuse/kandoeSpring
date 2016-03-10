/**
 * Created by amy on 16/02/2016.
 */
export class Address {
    public street: string;
    public number: string;
    public city: string;
    public zip: number;

    static fromJson(json: any): Address {
        var address = new Address();
        address.city = json.city;
        address.number = json.number;
        address.street = json.street;
        address.zip = json.zip;
        return address;
    }
}