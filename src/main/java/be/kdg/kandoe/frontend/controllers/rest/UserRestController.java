package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.Person;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import be.kdg.kandoe.frontend.DTO.LoginDTO;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import be.kdg.kandoe.frontend.assemblers.UserAssembler;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.hibernate.validator.internal.constraintvalidators.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UserDTO>> findUsers(){
        List<User> users = userService.findUsers();

        return new ResponseEntity<>(userAssembler.toResources(users), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO)
    {
        User user_in = mapperFacade.map(userDTO, User.class);

        try{

            User user_out = userService.saveUser(user_in);
            logger.info(this.getClass().toString() + ": adding new user " + user_out.getId());
            return new ResponseEntity<>(userAssembler.toResource(user_out), HttpStatus.CREATED);

        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": error adding new user \n" + e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findUserById(@PathVariable int userId)
    {
        logger.info(this.getClass().toString() + ":" + userId);
        User user = userService.findUserById(userId);
        UserDTO userDTO = userAssembler.toResource(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @RequestMapping(value ="/{userId}", method = RequestMethod.POST)
    public ResponseEntity<UserDTO>  updateUser(@PathVariable int userId, @RequestBody UserDTO userDTO, @AuthenticationPrincipal User user)
    {
        if(user != null && user.getId() == userId){
            User userIn = userService.findUserById(userId);
            mapperFacade.map(userDTO, userIn);
            User userOut = userService.saveUser(userIn);

            return new ResponseEntity<>(userAssembler.toResource(userOut), HttpStatus.CREATED);
        }
        return new ResponseEntity<UserDTO>(HttpStatus.UNAUTHORIZED);
    }
}
