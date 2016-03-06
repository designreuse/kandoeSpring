package be.kdg.kandoe.frontend.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

/**
 * Created by Jorda on 3/6/2016.
 */

@Controller
public class WebSocketMessageController {

    @MessageMapping("/chat")
    public String processChat(String chat){
        System.out.println("WebSocketMessageController has been triggered");
        return chat.toUpperCase();
    }
}
