package be.kdg.kandoe.frontend.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by Jordan on 8/03/2016.
 */
@Controller
public class WebSocketController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Greeting processChat(HelloMessage chat) throws Exception {
        System.out.println("WebSocketMessageController has been triggered: " + chat.getName());
        return new Greeting("Text Message is: " + chat.getName());
    }
}