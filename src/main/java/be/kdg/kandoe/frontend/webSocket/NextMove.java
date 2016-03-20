package be.kdg.kandoe.frontend.webSocket;

/**
 * Created by amy on 14/03/2016.
 */
public class NextMove {
    private int cardId;
    private int currentUserId;
    private int sessionId;

    public NextMove(int cardId, int nextUserId,int sessionId) {
        this.cardId = cardId;
        this.currentUserId = nextUserId;
        this.sessionId = sessionId;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public int getCurrentUserId() {
        return currentUserId;
    }

    public void setCurrentUserId(int currentUserId) {
        this.currentUserId = currentUserId;
    }

    public int getSessionId() {
        return sessionId;
    }

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }
}
