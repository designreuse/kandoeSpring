package be.kdg.kandoe.backend.dom.game.CircleSession;

import be.kdg.kandoe.backend.dom.game.CardSession;
import be.kdg.kandoe.backend.dom.game.Message;
import be.kdg.kandoe.backend.dom.game.Snapshot;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class Session implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "SessionId", nullable = false)
    @GeneratedValue
    private Integer sessionId;

    @Column(name = "Modus", nullable = false)
    private SessionMode mode;

    @Column(name = "MaxCards")
    private int max;

    @Column(name = "Size")
    private int size;

    @OneToMany(targetEntity = UserSession.class)
    private List<UserSession> userSessions;

    @OneToMany(targetEntity = CardSession.class)
    private List<CardSession> cardSessions;

    @ManyToOne(targetEntity = Theme.class)
    private Theme theme;

    @OneToMany(targetEntity = Snapshot.class)
    private List<Snapshot> snapshots;

    @OneToMany(targetEntity = Message.class)
    private List<Message> chat;

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public SessionMode getMode() {
        return mode;
    }

    public void setMode(SessionMode mode) {
        this.mode = mode;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public List<CardSession> getCardSessions() {
        return cardSessions;
    }

    public void setCardSessions(List<CardSession> cardSessions) {
        this.cardSessions = cardSessions;
    }

    public List<UserSession> getUserSessions() {
        return userSessions;
    }

    public void setUserSessions(List<UserSession> userSessions) {
        this.userSessions = userSessions;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public List<Snapshot> getSnapshots() {
        return snapshots;
    }

    public void setSnapshots(List<Snapshot> snapshots) {
        this.snapshots = snapshots;
    }

    public List<Message> getChat() {
        return chat;
    }

    public void setChat(List<Message> chat) {
        this.chat = chat;
    }

    @Override
    public Integer getId() {
        return sessionId;
    }
}
