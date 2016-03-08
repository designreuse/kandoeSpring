package be.kdg.kandoe.backend.dom.game.CircleSession;

import be.kdg.kandoe.backend.dom.game.Message;
import be.kdg.kandoe.backend.dom.game.Snapshot;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
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

    @Column(name = "Type")
    private SessionType type;

    @Column(name = "MinCards")
    private int minCards;

    @Column(name = "MaxCards")
    private int maxCards;

    @Column(name = "Size")
    private int size;

    @Column(name = "StartTime")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime startTime;

    @Column(name = "EndTime")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime endTime;

    @Column(name = "UserAddCards")
    private boolean userAddCards;

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

    public Session() {
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

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean isUserAddCards() {
        return userAddCards;
    }

    public void setUserAddCards(boolean userAddCards) {
        this.userAddCards = userAddCards;
    }

    public int getMinCards() {
        return minCards;
    }

    public void setMinCards(int minCards) {
        this.minCards = minCards;
    }

    public SessionType getType() {
        return type;
    }

    public void setType(SessionType type) {
        this.type = type;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public Integer getId() {
        return sessionId;
    }

    public int getMaxCards() {
        return maxCards;
    }

    public void setMaxCards(int maxCards) {
        this.maxCards = maxCards;
    }
}
