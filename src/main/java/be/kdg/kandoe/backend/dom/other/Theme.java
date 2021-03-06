package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * Represents a theme sessions will be created about.
 * Cards can be added to a theme. Can have multiple subthemes.
 */
@Entity
public class Theme implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "ThemeId", nullable = false)
    @GeneratedValue
    private Integer themeId;

    @Column(name = "ThemeName", nullable = false)
    private String themeName;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "ThemeIcon")
    private String iconURL;

    @OneToMany(targetEntity = SubTheme.class, fetch = FetchType.EAGER)
    private Set<SubTheme> subThemes;

    @ManyToOne(targetEntity = Organisation.class)
    private Organisation organisation;

    @OneToMany(targetEntity = Card.class, fetch = FetchType.EAGER)
    private Set<Card> cards;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    private User creator;

    public Theme() {
    }

    public Theme(String themeName) {
        this.themeName=themeName;
    }

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
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

    public Set<SubTheme> getSubThemes() {
        return subThemes;
    }

    public void setSubThemes(Set<SubTheme> subThemes) {
        this.subThemes = subThemes;
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

    @Override
    public Integer getId() {
        return themeId;
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }
}