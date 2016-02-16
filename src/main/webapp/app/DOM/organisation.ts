import {Link} from "./link";

export class Organisation {
    organisationId:number;
    organisationName:string;
    address:string;
    logoUrl:string;
    links:Link[];


    constructor(organisationId:number, organisationName:string) {
        this.organisationId = organisationId;
        this.organisationName = organisationName;
    }

    static fromJson(json:any):Organisation {
        var organisation = new Organisation(json.organisationId, json.organisationName);
        organisation.address = json.address;
        organisation.logoUrl = json.logoUrl;

        for (var i = 0; i < json.links.length; i++){
            organisation.links[i] = Link.fromJson(json.links[i])
        }

        return organisation;
    }
}