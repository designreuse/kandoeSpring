import {Link} from "./link";

export class Organisation {
    organisationId:number;
    organisationName:string;
    address:string;
    logoUrl:string;
    organiser: boolean;
    links:Link[];

    constructor(){

    }


    static fromJson(json:any):Organisation {
        var organisation = new Organisation();
        organisation.organisationId = json.organisationId;
        organisation.organisationName = json.organisationName;
        organisation.address = json.address;
        organisation.logoUrl = json.logoURL;

        if(json.organiser){
            organisation.organiser = json.organiser;
        }

        if(json.links){
            for (var i = 0; i < json.links.length; i++){
                organisation.links[i] = Link.fromJson(json.links[i]);
            }
        }


        return organisation;
    }

    static createEmpty(): Organisation {
        var org = new Organisation();
        return org;
    }
}