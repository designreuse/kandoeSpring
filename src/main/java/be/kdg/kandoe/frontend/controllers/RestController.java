package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.backend.dom.Organisation;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Jordan on 10/02/2016.
 */
@Controller
@RequestMapping(value = "/api")
public class RestController {

    private final OrganisationService organisationService;

    @Autowired
    public RestController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @RequestMapping(value="/",method = RequestMethod.GET)
    public Organisation getOrganisation(){
        return organisationService.findOrganisationByName("KDG");
    }
}
