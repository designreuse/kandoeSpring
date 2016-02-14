package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.frontend.DTO.AddressDTO;
import be.kdg.kandoe.frontend.DTO.PersonDTO;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import be.kdg.kandoe.frontend.controllers.rest.UserRestController;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by amy on 13/02/2016.
 */

@Component
public class UserAssembler extends ResourceAssemblerSupport<User, UserDTO> {

    private MapperFacade mapper;

    @Autowired
    public UserAssembler(MapperFacade mapper) {
        super(UserRestController.class, UserDTO.class);
        this.mapper = mapper;
    }

    @Override
    public UserDTO toResource(User user) {
        UserDTO userDTO = mapper.map(user, UserDTO.class);

        userDTO.setUserId(user.getId());

        return userDTO;
    }
}
