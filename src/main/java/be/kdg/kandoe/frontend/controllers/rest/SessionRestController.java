package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.frontend.DTO.SessionDTO;
import be.kdg.kandoe.frontend.assemblers.SessionAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by amy on 7/03/2016.
 */

@RestController
@RequestMapping(value = "/api/sessions")
public class SessionRestController {
    private final Logger logger = Logger.getLogger(CardRestController.class);
    private final SessionService sessionService;
    private final SessionAssembler sessionAssembler;
    private final MapperFacade mapper;

    @Autowired
    public SessionRestController(SessionService sessionService, SessionAssembler sessionAssembler, MapperFacade mapper) {
        this.sessionService = sessionService;
        this.sessionAssembler = sessionAssembler;
        this.mapper = mapper;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/{sessionId}")
    public ResponseEntity<SessionDTO> getSessionById(@PathVariable("sessionId") int sessionId, @AuthenticationPrincipal User user){
        if(user != null){
            try {
                Session session = this.sessionService.findSessionById(sessionId, user.getUserId());
                System.out.println(session.getSessionId());
                return new ResponseEntity<>(sessionAssembler.toResource(session), HttpStatus.OK);
            } catch (SessionServiceException e) {
                return new ResponseEntity<SessionDTO>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<SessionDTO>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/currentUser" ,method = RequestMethod.GET)
    public ResponseEntity<List<SessionDTO>> getSessionsCurrentUser(@AuthenticationPrincipal User user){
        if(user != null){
            try {
                List<Session> sessions = this.sessionService.findSessionsCurrentUser(user.getUserId());
                return new ResponseEntity<List<SessionDTO>>(sessionAssembler.toResources(sessions), HttpStatus.OK);
            } catch (SessionServiceException e) {
                return new ResponseEntity<List<SessionDTO>>(HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<List<SessionDTO>>(HttpStatus.UNAUTHORIZED);
    }

}
