package be.kdg.kandoe.frontend.webSocket;

/**
 * Created by Jordan on 8/03/2016.
 */
public class HelloMessage {
    private String content;
    private String token;
    private Integer sessionId;

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }
}
