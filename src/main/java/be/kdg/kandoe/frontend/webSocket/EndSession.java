package be.kdg.kandoe.frontend.webSocket;

/**
 * Created by amy on 20/03/2016.
 */
public class EndSession {
    private String token;
    private Integer sessionId;
    private Integer cardId;

    public EndSession(Integer sessionId, Integer cardId) {
        this.sessionId = sessionId;
        this.cardId = cardId;
    }

    public EndSession() {

    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }
}
