package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.frontend.DTO.SessionDTO;
import be.kdg.kandoe.frontend.controllers.rest.OrganisationRestController;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by amy on 7/03/2016.
 */
@Component
public class SessionAssembler extends ResourceAssemblerSupport<Session, SessionDTO>{

    private MapperFacade mapper;

    @Autowired
    public SessionAssembler(MapperFacade mapper) {
        super(OrganisationRestController.class, SessionDTO.class);
        this.mapper = mapper;
    }

    public List<SessionDTO> toResources(Iterable<? extends Session> entities){
        return StreamSupport
                .stream(entities.spliterator(), false)
                .map(r -> toResource(r))
                .collect(Collectors.toList());
    }

    public SessionDTO toResource(Session session) {
        SessionDTO sessionDTO = mapper.map(session, SessionDTO.class);
        return sessionDTO;
    }
}
