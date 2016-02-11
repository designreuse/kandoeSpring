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

    @ManyToOne(targetEntity = Card.class, fetch = FetchType.EAGER)
    private Card card;

    @ManyToOne(targetEntity = Session.class, fetch = FetchType.EAGER)
    private Session session;

    @Override
    public Integer getId() {
        return cardSessionId;
    }
}
