package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import be.kdg.kandoe.frontend.assemblers.OrganisationAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/organisations")
@ExposesResourceFor(OrganisationDTO.class)
public class OrganisationRestController {

    private final Logger logger = Logger.getLogger(OrganisationRestController.class);
    private final OrganisationService organisationService;
    private final OrganisationAssembler organisationAssembler;
    private final MapperFacade mapper;

    @Autowired
    public OrganisationRestController(OrganisationService organisationService, OrganisationAssembler organisationAssembler, MapperFacade mapper) {
        this.organisationService = organisationService;
        this.organisationAssembler = organisationAssembler;
        this.mapper = mapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<OrganisationDTO>> getOrganisations(){
        List<Organisation> orgs = organisationService.findOrganisations();

        return new ResponseEntity<>(organisationAssembler.toResources(orgs), HttpStatus.OK);
    }

    @RequestMapping(value = "/{organisationId}", method = RequestMethod.GET)
    public ResponseEntity<OrganisationDTO> getOrganisationById(@PathVariable(value = "organisationId") int orgId){
        Organisation org = organisationService.findOrganisationById(orgId);

        return new ResponseEntity<>(organisationAssembler.toResource(org), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<OrganisationDTO> createOrganisation(@Valid @RequestBody OrganisationDTO organisationDTO){
        Organisation org_in = mapper.map(organisationDTO, Organisation.class);

        //todo change to currently logged in user
        Organisation org_out = organisationService.saveOrganisation(org_in, 1);
        logger.info(this.getClass().toString() + ": adding new organisation " + org_out.getId());

        return new ResponseEntity<>(organisationAssembler.toResource(org_out), HttpStatus.CREATED);
    }
}
