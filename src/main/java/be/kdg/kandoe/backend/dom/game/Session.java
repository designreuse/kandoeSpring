package be.kdg.kandoe.backend.dom.game;

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

    @Column(name = "CurrentUser")
    private User user;

    @OneToMany(targetEntity = CardSession.class)
    private List<CardSession> cardSessions;

    @ManyToOne(targetEntity = Theme.class)
    private Theme theme;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER)
    private List<User> users;

    @OneToMany(targetEntity = Snapshot.class)
    private List<Snapshot> snapshots;

    @OneToMany(targetEntity = Message.class)
    private List<Message> chat;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
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
