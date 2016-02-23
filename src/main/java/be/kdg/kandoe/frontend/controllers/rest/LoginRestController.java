package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.frontend.DTO.LoginDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

@RestController
public class LoginRestController {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;

    @Autowired
    public LoginRestController(BCryptPasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, @AuthenticationPrincipal User user){
        if(user == null){
            User u = userService.findUserByUsername(loginDTO.getUsername());

            if(passwordEncoder.matches(loginDTO.getPassword(), u.getPassword())){
                String token = null;

                    Base64.Encoder encoder = Base64.getEncoder();
                    token = Jwts.builder().setSubject(u.getUsername())
                            .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();

                return new ResponseEntity<String>(token, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Wrong username or password", HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<String>("Already logged in", HttpStatus.BAD_REQUEST);
    }
}
