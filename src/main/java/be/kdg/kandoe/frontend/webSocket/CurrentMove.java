package be.kdg.kandoe.frontend.webSocket;

/**
 * Created by amy on 14/03/2016.
 */
public class CurrentMove {
    private String token;
    private Integer sessionId;
    private Integer cardId;

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
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
