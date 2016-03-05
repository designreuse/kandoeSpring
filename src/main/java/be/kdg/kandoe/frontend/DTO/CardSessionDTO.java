package be.kdg.kandoe.frontend.DTO;

public class CardSessionDTO {
    private Integer cardSessionId;
    private int position;
    private CardDTO card;
    private SessionDTO session;

    public CardSessionDTO() {
    }

    public Integer getCardSessionId() {
        return cardSessionId;
    }

    public void setCardSessionId(Integer cardSessionId) {
        this.cardSessionId = cardSessionId;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public CardDTO getCard() {
        return card;
    }

    public void setCard(CardDTO card) {
        this.card = card;
    }

    public SessionDTO getSession() {
        return session;
    }

    public void setSession(SessionDTO session) {
        this.session = session;
    }
}
