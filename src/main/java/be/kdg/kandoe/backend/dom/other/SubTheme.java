package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;


/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class SubTheme implements Serializable, Identifiable<Integer> {
    @Id
    @Column(name = "SubThemeId", nullable = false)
    @GeneratedValue
    private Integer subThemeId;

    @Column(name = "SubThemeName", nullable = false)
    private String subThemeName;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "SubThemeIcon")
    private String iconURL;

    @ManyToOne(targetEntity = Organisation.class)
    private Organisation organisation;

    @OneToMany(targetEntity = Card.class, fetch = FetchType.EAGER)
    private Set<Card> cards;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    private User creator;

    @ManyToOne(targetEntity = Theme.class)
    private Theme theme;

    public SubTheme() {
    }


    public String getSubThemeName() {
        return subThemeName;
    }

    public void setSubThemeName(String subThemeName) {
        this.subThemeName = subThemeName;
    }

    public Integer getSubThemeId() {
        return subThemeId;
    }

    public void setSubThemeId(Integer subThemeId) {
        this.subThemeId = subThemeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconURL() {
        return iconURL;
    }

    public void setIconURL(String iconURL) {
        this.iconURL = iconURL;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    @Override
    public Integer getId() {
        return subThemeId;
    }

}

