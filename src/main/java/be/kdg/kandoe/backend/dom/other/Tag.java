package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.game.Card;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class Tag implements Serializable, Identifiable<Integer>{

    @Id
    @Column(name = "TagId", nullable = false)
    @GeneratedValue
    private Integer tagId;

    @Column(name = "Description", nullable = false)
    private String description;

    @ManyToMany(targetEntity = Theme.class, fetch = FetchType.EAGER)
    private List<Theme> themes;

    @ManyToMany(targetEntity = Card.class, fetch = FetchType.EAGER)
    private List<Card> card;

    public Tag(String description, List<Theme> themes, List<Card> card) {
        this.description = description;
        this.themes = themes;
        this.card = card;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Theme> getThemes() {
        return themes;
    }

    public void setThemes(List<Theme> themes) {
        this.themes = themes;
    }

    public List<Card> getCard() {
        return card;
    }

    public void setCard(List<Card> card) {
        this.card = card;
    }

    @Override
    public Integer getId() {
        return tagId;
    }
}
