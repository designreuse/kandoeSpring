package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.backend.dom.other.Organisation;
import org.springframework.web.bind.annotation.*;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

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

    @RequestMapping(value="/",method = RequestMethod.GET)
    public String getOrganisation(){
        return "Dit komt van de API normaal gezien";
    }
}
