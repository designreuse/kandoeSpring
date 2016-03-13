package be.kdg.kandoe.frontend.webSocket;

import be.kdg.kandoe.backend.dom.users.User;

/**
 * Created by Jordan on 8/03/2016.
 */
public class Greeting {
    private String content;
    private String username;

    public Greeting(String username, String content) {
        this.username = username;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
