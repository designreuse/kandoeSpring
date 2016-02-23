package be.kdg.kandoe.backend.dom.game;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
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

    public CardSession(int position, Card card, Session session) {
        this.position = position;
        this.card = card;
        this.session = session;
    }

    @Override
    public Integer getId() {
        return cardSessionId;
    }
}
