package be.kdg.kandoe.backend.dom.game;

import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Represents a card which can be used in a session.
 * A card belongs to a theme or subtheme.
 */
@Entity
public class Card implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "CardId", nullable = false)
    @GeneratedValue
    private Integer cardId;

    @Column(name = "CardDescription", nullable = false)
    private String description;

    @Column(name = "Image")
    private String imageURL;

    @ManyToOne(targetEntity = Theme.class)
    private Theme theme;

    @ManyToOne(targetEntity = SubTheme.class)
    private SubTheme subTheme;

    @OneToMany(targetEntity = CardSession.class)
    private List<CardSession> cardSessions;

    public Card(String description, String imageURL) {
        this.description = description;
        this.imageURL = imageURL;
    }

    public Card() {
    }

    public Card(String description) {
        this.description = description;
    }

    public List<CardSession> getCardSessions() {
        return cardSessions;
    }

    public void setCardSessions(List<CardSession> cardSessions) {
        this.cardSessions = cardSessions;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

   public SubTheme getSubTheme() {
        return subTheme;
    }

    public void setSubTheme(SubTheme subTheme) {
        this.subTheme = subTheme;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    @Override
    public Integer getId() {
        return cardId;
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }
}
