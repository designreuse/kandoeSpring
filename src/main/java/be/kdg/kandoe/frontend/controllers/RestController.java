package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.backend.dom.other.Organisation;
import org.springframework.web.bind.annotation.*;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.validation.constraints.Null;

/**
 * Created by Jordan on 10/02/2016.
 */
@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/api")
public class RestController {

    private final OrganisationService organisationService;

    @Autowired
    public RestController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @RequestMapping(value="/getOrganisation/{organisationId}",method = RequestMethod.GET)
    public OrganisationDTO getOrganisation(@PathVariable(value = "organisationId") String orgName){
        OrganisationDTO orgDto;
        Organisation org;
        org = organisationService.findOrganisationByName(orgName);
        if(org== null){
            org = new Organisation(orgName);
            organisationService.saveOrganisation(org);
        }
        orgDto=new OrganisationDTO(org.getOrganisationName());
        return orgDto;
    }
}
