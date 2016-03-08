package be.kdg.kandoe.frontend.DTO;

import be.kdg.kandoe.backend.dom.game.CircleSession.SessionMode;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionType;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class SessionDTO extends ResourceSupport implements Serializable{
    private Integer sessionId;
    private SessionMode mode;
    private SessionType type;
    private int minCards;
    private int maxCards;
    private int size;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean userAddCards;

    //todo add mapper for this?
    private List<CardDTO> cards;

    public SessionDTO() {
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public SessionMode getMode() {
        return mode;
    }

    public void setMode(SessionMode mode) {
        this.mode = mode;
    }

    public SessionType getType() {
        return type;
    }

    public void setType(SessionType type) {
        this.type = type;
    }

    public int getMinCards() {
        return minCards;
    }

    public void setMinCards(int minCards) {
        this.minCards = minCards;
    }

    public int getMaxCards() {
        return maxCards;
    }

    public void setMaxCards(int maxCards) {
        this.maxCards = maxCards;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
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

    public List<CardDTO> getCards() {
        return cards;
    }

    public void setCards(List<CardDTO> cards) {
        this.cards = cards;
    }
}
