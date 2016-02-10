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

    @RequestMapping(value="/getOrganisation",method = RequestMethod.GET)
    public OrganisationDTO getOrganisation(@RequestParam(value="organisationId") String organisation){
        OrganisationDTO organisationDTO;
        Organisation org = organisationService.findOrganisationByName(organisation);
        organisationDTO = new OrganisationDTO(org.getOrganisationName());
        organisationDTO.setOmschrijving("Komt van de API");
        return organisationDTO;
    }
}
