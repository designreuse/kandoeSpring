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

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findUserById(@PathVariable int userId)
    {
        logger.info(this.getClass().toString() + ":" + userId);
        User user = userService.findUserById(userId);
        UserDTO userDTO = userAssembler.toResource(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findCurrentUser(@AuthenticationPrincipal User user) {
        if (user != null && user.getUsername() != null) {
            UserDTO userDTO = userAssembler.toResource(user);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> createUser(@Valid @RequestBody UserDTO userDTO)
    {
        User user_in = mapperFacade.map(userDTO, User.class);

        try{
            User user_out = userService.saveUser(user_in);
            logger.info(this.getClass().toString() + ": adding new user " + user_out.getId());

            String token = Jwts.builder().setSubject(user_out.getUsername())
                    .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();

            return new ResponseEntity<>(token, HttpStatus.CREATED);

        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": error adding new user \n" + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value ="/updateUser", method = RequestMethod.POST)
    public ResponseEntity<UserDTO>  updateUser(@RequestBody UserDTO userDTO, @AuthenticationPrincipal User user)
    {
        if(user != null){
            User userIn = userService.findUserById(user.getId());
            mapperFacade.map(userDTO, userIn);
            User userOut = userService.updateUser(userIn);

            return new ResponseEntity<>(userAssembler.toResource(userOut), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value ="/changePassword", method = RequestMethod.POST)
    public ResponseEntity<String> changePassword(@RequestBody UserDTO userDTO, @AuthenticationPrincipal User user)
    {
        if(user != null){
            try{
                userService.changePassword(userDTO.getOldPassword(), userDTO.getPassword(), user.getId());

                return new ResponseEntity<>(HttpStatus.OK);
            } catch (UserServiceException e){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
