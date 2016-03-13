package be.kdg.kandoe.frontend.webSocket;

/**
 * Created by Jordan on 8/03/2016.
 */
public class HelloMessage {
    private String name;
    private String token;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
