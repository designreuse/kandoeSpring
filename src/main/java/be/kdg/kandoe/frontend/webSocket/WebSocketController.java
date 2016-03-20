package be.kdg.kandoe.frontend.webSocket;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import be.kdg.kandoe.frontend.DTO.SessionDTO;
import be.kdg.kandoe.frontend.assemblers.SessionAssembler;
import io.jsonwebtoken.Jwts;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

/**
 * Created by Jordan on 8/03/2016.
 */
@Controller
public class WebSocketController {

    private final Logger logger = Logger.getLogger(WebSocketController.class);
    private final UserService userService;
    private final SessionService sessionService;
    private final SessionAssembler sessionAssembler;

    @Autowired
    public WebSocketController(UserService userService, SessionService sessionService, SessionAssembler sessionAssembler) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.sessionAssembler = sessionAssembler;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Greeting processChat(HelloMessage chat) {
        User u = getUserFromToken(chat.getToken());

        if (u != null) {
            try {
                Session s = sessionService.addMessageToChat(chat.getSessionId(), chat.getContent(),
                        u.getId(), LocalDateTime.now());

                return new Greeting(u.getUsername(), chat.getContent(),
                        String.valueOf(LocalDateTime.now().getHour() + ":" + LocalDateTime.now().getMinute()),
                        u.getProfilePicture(),chat.getSessionId());

            } catch (SessionServiceException e) {
                return null;
            }
        }
        return null;
    }

    @MessageMapping("/move")
    @SendTo("/topic/move")
    public NextMove processMove(CurrentMove move) {
        User u = getUserFromToken(move.getToken());

        if (u != null) {
            try {
                sessionService.updateCardPosition(move.getCardId(), u.getUserId(), move.getSessionId());
                Session currentSession = sessionService.findSessionById(move.getSessionId(),u.getUserId());
                int currentUserId = currentSession.getUserSessions().stream().filter(cu-> cu.getUserPosition()==0).findFirst().get().getUser().getUserId();
                return new NextMove(move.getCardId(),currentUserId,move.getSessionId());
            } catch (SessionServiceException e) {
                return null;
            }
        }
        return null;
    }

    @MessageMapping("/addCards")
    @SendTo("/topic/addCards")
    public SessionDTO addCardsToSession(Cards cards){

        User u = getUserFromToken(cards.getToken());

        if(u == null)
            return null;

        try {
            Session session = sessionService.addCardIdsToSession(cards.getSessionId(), cards.getCardIds(), u.getId());
            return sessionAssembler.toResource(session);
        } catch (SessionServiceException e) {
            return null;
        }
    }

    @MessageMapping("/endSession")
    @SendTo("/topic/endSession")
    public EndSession endSession(EndSession endSession){

        User u = getUserFromToken(endSession.getToken());
        Session session = null;
        if(u== null){
            return null;
        }
        try {
            session = sessionService.stopSession(endSession.getSessionId(), u.getUserId());
            System.out.println(session.getSessionId());
            return new EndSession(session.getSessionId(),endSession.getCardId());
        } catch (SessionServiceException e) {
            return null;
        }
    }

    private User getUserFromToken(String token){
        String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                .parseClaimsJws(token.replace("\"", "")).getBody().getSubject();
        try {
            return userService.findUserByUsername(username);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": failed to find user from token", e);
        }
        return null;
    }
}