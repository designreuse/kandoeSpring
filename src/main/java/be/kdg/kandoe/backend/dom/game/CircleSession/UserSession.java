package be.kdg.kandoe.backend.dom.game.CircleSession;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Represents a user in a session.
 * Holds the position of the user in that session. The user can play when the position is 0.
 */

@Entity
public class UserSession implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "UserSessionId", nullable = false)
    @GeneratedValue
    private Integer userSessionId;

    @Column(name = "UserPosition", nullable = false)
    private int userPosition;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(targetEntity = Session.class)
    private Session session;

    @Column(name = "ChosenCards", nullable = false)
    private boolean chosenCards = false;

    public UserSession() {
    }

    public UserSession(int userPosition, User user, Session session) {
        this.userPosition = userPosition;
        this.user = user;
        this.session = session;
    }

    public Integer getUserSessionId() {
        return userSessionId;
    }

    public void setUserSessionId(Integer userSessionId) {
        this.userSessionId = userSessionId;
    }

    public int getUserPosition() {
        return userPosition;
    }

    public void setUserPosition(int userPosition) {
        this.userPosition = userPosition;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public boolean isChosenCards() {
        return chosenCards;
    }

    public void setChosenCards(boolean chosenCards) {
        this.chosenCards = chosenCards;
    }

    @Override
    public Integer getId() {
        return userSessionId;
    }
}
