package be.kdg.kandoe.backend.dom.game.CircleSession;

import be.kdg.kandoe.backend.dom.game.Card;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class CardSession implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "CardSessionId", nullable = false)
    @GeneratedValue
    private Integer cardSessionId;

    @Column(name = "Position", nullable = false)
    private int position;

    @ManyToOne(targetEntity = Card.class)
    private Card card;

    @ManyToOne(targetEntity = Session.class)
    private Session session;

    public CardSession() {
    }

    public CardSession(int position, Card card, Session session) {
        this.position = position;
        this.card = card;
        this.session = session;
    }

    @Override
    public Integer getId() {
        return cardSessionId;
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

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }


}
