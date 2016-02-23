package be.kdg.kandoe.backend.dom.game;

import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
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


    public Card(String description) {
        this.description = description;
    }

    public Card(String description, String imageURL) {
        this.description = description;
        this.imageURL = imageURL;
    }

    @ManyToOne(targetEntity = Theme.class)
    private Theme theme;

    @OneToMany(targetEntity = CardSession.class)
    private List<CardSession> cardSessions;

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
}
