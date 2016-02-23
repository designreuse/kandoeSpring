package be.kdg.kandoe.backend.dom.game.CircleSession;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 23/02/2016.
 */

@Entity
public class UserSession implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "UserSessionId", nullable = false)
    @GeneratedValue
    private Integer userSessionId;

    @Column(name = "UserPosition", nullable = false)
    private int userPosition;

    @ManyToOne(targetEntity = User.class)
    private User user;

    @ManyToOne(targetEntity = Session.class)
    private Session session;

    public UserSession(int userPosition, User user, Session session) {
        this.userPosition = userPosition;
        this.user = user;
        this.session = session;
    }

    @Override
    public Integer getId() {
        return userSessionId;
    }
}
