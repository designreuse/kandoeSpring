package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import be.kdg.kandoe.frontend.assemblers.UserAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.hibernate.validator.internal.constraintvalidators.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 * Created by amy on 13/02/2016.
 */

@RestController
@RequestMapping("/api/users")
@ExposesResourceFor(UserDTO.class)
public class UserRestController {
    private final Logger logger = Logger.getLogger(UserRestController.class);
    private final UserService userService;
    private final UserAssembler userAssembler;
    private final MapperFacade mapperFacade;

    @Autowired
    public UserRestController(UserService userService,  UserAssembler userAssembler, MapperFacade mapperFacade) {
        this.userService = userService;
        this.mapperFacade = mapperFacade;
        this.userAssembler = userAssembler;
    }


    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findUserById(@PathVariable int userId)
    {
        logger.info(this.getClass().toString() + ":" + userId);
        User user = userService.findUserById(userId);
        UserDTO userDTO = userAssembler.toResource(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
}
