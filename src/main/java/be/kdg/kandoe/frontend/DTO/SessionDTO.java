package be.kdg.kandoe.frontend.DTO;

import be.kdg.kandoe.backend.dom.game.CircleSession.SessionMode;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionState;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionType;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class SessionDTO extends ResourceSupport implements Serializable {
    private Integer sessionId;
    private String sessionName;
    private SessionMode mode;
    private SessionType type;
    private SessionState state;
    private int minCards;
    private int maxCards;
    private int size;
    private String startTime;
    private String endTime;
    private boolean userAddCards;
    private Integer themeId;
    private Integer subThemeId;
    private boolean chosenCards;
    private List<CardDTO> cards;
    private List<UserDTO> users;
    private ThemeDTO theme;
    private SubThemeDTO subTheme;
    private int playtime;

    public SessionDTO() {
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
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

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
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

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }

    public ThemeDTO getTheme() {
        return theme;
    }

    public void setTheme(ThemeDTO theme) {
        this.theme = theme;
    }

    public boolean isChosenCards() {
        return chosenCards;
    }

    public void setChosenCards(boolean chosenCards) {
        this.chosenCards = chosenCards;
    }

    public SessionState getState() {
        return state;
    }

    public void setState(SessionState state) {
        this.state = state;
    }

    public Integer getSubThemeId() {
        return subThemeId;
    }

    public void setSubThemeId(Integer subThemeId) {
        this.subThemeId = subThemeId;
    }

    public SubThemeDTO getSubTheme() {
        return subTheme;
    }

    public void setSubTheme(SubThemeDTO subTheme) {
        this.subTheme = subTheme;
    }

    public int getPlaytime() {
        return playtime;
    }

    public void setPlaytime(int playtime) {
        this.playtime = playtime;
    }
}
