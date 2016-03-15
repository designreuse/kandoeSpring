package be.kdg.kandoe.frontend.webSocket;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import io.jsonwebtoken.Jwts;
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

    private final UserService userService;
    private final SessionService sessionService;

    @Autowired
    public WebSocketController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Greeting processChat(HelloMessage chat) {
        String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                .parseClaimsJws(chat.getToken().replace("\"", "")).getBody().getSubject();
        User u = userService.findUserByUsername(username);

        if (u != null) {
            try {
                Session s = sessionService.addMessageToChat(chat.getSessionId(), chat.getContent(), u.getId());
                return new Greeting(u.getUsername(), chat.getContent(), String.valueOf(LocalDateTime.now().getHour() + ":" + LocalDateTime.now().getMinute()), u.getProfilePicture());
            } catch (SessionServiceException e) {
                return null;
            }
          

        }
        return null;
    }

    @MessageMapping("/move")
    @SendTo("/topic/move")
    public NextMove processMove(CurrentMove move) {
        String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                .parseClaimsJws(move.getToken().replace("\"", "")).getBody().getSubject();
        User u = userService.findUserByUsername(username);

        if (u != null) {
            try {
                sessionService.updateCardPosition(move.getCardId(), u.getUserId(), move.getSessionId());
                Session currentSession = sessionService.findSessionById(move.getSessionId(),u.getUserId());
                int currentUserId = currentSession.getUserSessions().stream().filter(cu-> cu.getUserPosition()==0).findFirst().get().getUser().getUserId();
                return new NextMove(move.getCardId(),currentUserId);
            } catch (SessionServiceException e) {
                return null;
            }
        }
        return null;
    }
}