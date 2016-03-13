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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Date;

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

        if(u != null){
            try {
                Session s = sessionService.addMessageToChat(chat.getSessionId(), chat.getContent(), u.getId());
                return new Greeting(u.getUsername(), chat.getContent());
            } catch (SessionServiceException e) {
                return null;
            }
            System.out.println("WebSocketMessageController has been triggered: " + chat.getName());
            return new Greeting(u.getUsername(), chat.getName(), String.valueOf(LocalDateTime.now().getHour() +":"+LocalDateTime.now().getMinute()), u.getProfilePicture());
        }

        }
        return null;
    }
}