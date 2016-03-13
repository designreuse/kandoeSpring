package be.kdg.kandoe.frontend.webSocket;

import be.kdg.kandoe.backend.dom.users.User;

/**
 * Created by Jordan on 8/03/2016.
 */
public class Greeting {
    private String content;
    private String username;
    private String userpicture;
    private String date;

    public Greeting(String username, String content, String date, String userpicture) {
        this.username = username;
        this.content = content;
        this.date = date;
        this.userpicture = userpicture;
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


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUserpicture() {
        return userpicture;
    }

    public void setUserpicture(String userpicture) {
        this.userpicture = userpicture;
    }
}
