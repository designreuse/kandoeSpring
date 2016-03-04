package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import be.kdg.kandoe.frontend.DTO.LoginDTO;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginRestController {
    private final Logger logger = Logger.getLogger(LoginRestController.class);
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;
    private final MapperFacade mapperFacade;

    @Autowired
    public LoginRestController(BCryptPasswordEncoder passwordEncoder, UserService userService, MapperFacade mapperFacade) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.mapperFacade = mapperFacade;
    }

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, @AuthenticationPrincipal User user){
        if(user == null){
            try{
                User u = userService.findUserByUsername(loginDTO.getUsername());

                if(passwordEncoder.matches(loginDTO.getPassword(), u.getPassword())){
                    String token = Jwts.builder().setSubject(u.getUsername())
                            .claim("facebookAccount", u.isFacebookAccount())
                            .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();
                    return new ResponseEntity<>(token, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Wrong username or password", HttpStatus.UNAUTHORIZED);
                }
            }
            catch (UserServiceException e){
                return new ResponseEntity<>("Wrong username or password", HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>("Already logged in", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/api/login/check", method = RequestMethod.GET)
    public ResponseEntity<String> checkToken(@AuthenticationPrincipal User user){
        if(user != null){
            if(user.isFacebookAccount()){
                return new ResponseEntity<String>("Facebook", HttpStatus.OK);
            }
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/api/login/facebook", method = RequestMethod.POST)
    public ResponseEntity<String> loginFacebook(@RequestBody UserDTO userDTO) {
        try {
            User u = userService.findUserByUsername(userDTO.getUsername());
            String token = Jwts.builder().setSubject(u.getUsername())
                    .claim("facebookAccount", u.isFacebookAccount())
                    .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (UserServiceException e) {
            //User does not exist
            User user_in = mapperFacade.map(userDTO, User.class);

            try{
                User user_out = userService.saveUser(user_in);
                logger.info(this.getClass().toString() + ": adding new user " + user_out.getId());

                String token = Jwts.builder().setSubject(user_out.getUsername())
                        .claim("facebookAccount", userDTO.isFacebookAccount())
                        .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();

                return new ResponseEntity<>(token, HttpStatus.CREATED);

            } catch (UserServiceException ex){
                logger.warn(this.getClass().toString() + ": error adding new user \n" + ex.getMessage());
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
    }
}
