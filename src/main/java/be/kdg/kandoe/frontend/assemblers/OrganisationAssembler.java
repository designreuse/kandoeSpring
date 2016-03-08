package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import be.kdg.kandoe.frontend.controllers.rest.OrganisationRestController;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class OrganisationAssembler extends ResourceAssemblerSupport<Organisation, OrganisationDTO>{

    private MapperFacade mapper;

    @Autowired
    public OrganisationAssembler(MapperFacade mapper) {
        super(OrganisationRestController.class, OrganisationDTO.class);
        this.mapper = mapper;
    }

    @Override
    public List<OrganisationDTO> toResources(Iterable<? extends Organisation> entities) {
        return StreamSupport
                .stream(entities.spliterator(), false)
                .map(r -> toResource(r))
                .collect(Collectors.toList());
    }

    @Override
    public OrganisationDTO toResource(Organisation entity) {
        OrganisationDTO organisationDTO = mapper.map(entity, OrganisationDTO.class);
        organisationDTO.addCountUsers(entity.getUsers().size());
        organisationDTO.addCountUsers(entity.getOrganisers().size());
        return organisationDTO;
    }
}
