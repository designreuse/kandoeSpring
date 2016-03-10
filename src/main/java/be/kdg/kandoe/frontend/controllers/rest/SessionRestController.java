package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.DTO.SessionDTO;
import be.kdg.kandoe.frontend.assemblers.SessionAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
                SessionDTO dto = sessionAssembler.toResource(session);

                session.getUserSessions().stream().filter(us -> us.getUser().getId().equals(user.getId()))
                        .findFirst().ifPresent(userSession ->  dto.setChosenCards(userSession.isChosenCards()));

                return new ResponseEntity<>(dto, HttpStatus.OK);
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

    @RequestMapping(method = {RequestMethod.GET}, value = "/theme/{themeId}")
    public ResponseEntity<List<SessionDTO>> getSessionByThemeId(@PathVariable("themeId") int themeId, @AuthenticationPrincipal User user){
        if (user != null){
            try{
                List<Session> sessions = this.sessionService.findSessionByThemeId(themeId, user.getUserId());
                return new ResponseEntity<List<SessionDTO>>(sessionAssembler.toResources(sessions), HttpStatus.OK);
            } catch (SessionServiceException e) {
                return new ResponseEntity<List<SessionDTO>>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<List<SessionDTO>>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<SessionDTO> createSession(@RequestBody SessionDTO sessionDTO, @AuthenticationPrincipal User user){
        if(user != null){
            try {
                Session session_in = mapper.map(sessionDTO, Session.class);
                Session session_out = sessionService.createSession(session_in, sessionDTO.getThemeId(), user.getId());

                return new ResponseEntity<SessionDTO>(sessionAssembler.toResource(session_out), HttpStatus.CREATED);
            } catch (SessionServiceException e) {
                return new ResponseEntity<SessionDTO>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<SessionDTO>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/{sessionId}/addCards", method = RequestMethod.POST)
    public ResponseEntity<SessionDTO> addCardsToSession(@RequestBody List<CardDTO> cardDTOs,
                                                        @PathVariable("sessionId") Integer sessionId,
                                                        @AuthenticationPrincipal User user) {
        if(user != null){
            try {
                List<Card> cards = new ArrayList<>();
                for (CardDTO cardDTO : cardDTOs) {
                    cards.add(mapper.map(cardDTO, Card.class));
                }

                Session session = sessionService.addCardsToSession(sessionId, cards, user.getId());
                return new ResponseEntity<SessionDTO>(sessionAssembler.toResource(session), HttpStatus.OK);
            } catch (SessionServiceException e) {
                return new ResponseEntity<SessionDTO>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<SessionDTO>(HttpStatus.UNAUTHORIZED);
    }
}
