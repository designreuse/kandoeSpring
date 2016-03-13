package be.kdg.kandoe.frontend.webSocket;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

/**
 * Created by Jordan on 8/03/2016.
 */
@Controller
public class WebSocketController {

    @Autowired
    UserService userService;

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Greeting processChat(HelloMessage chat) throws Exception {
        String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                .parseClaimsJws(chat.getToken().replace("\"", "")).getBody().getSubject();
        User u = userService.findUserByUsername(username);

        if(u != null){
            System.out.println("WebSocketMessageController has been triggered: " + chat.getName());
            return new Greeting(u.getUsername(), chat.getName());
        }

        return null;
    }
}