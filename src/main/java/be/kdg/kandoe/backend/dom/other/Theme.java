package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
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

    @OneToMany(targetEntity = SubTheme.class)
    private List<SubTheme> subThemes;

    @ManyToOne(targetEntity = Organisation.class)
    private Organisation organisation;

    @OneToMany(targetEntity = Card.class)
    private List<Card> cards;

    @ManyToMany(targetEntity = Tag.class)
    private List<Tag> tags;

    @ManyToOne(targetEntity = User.class)
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

    public List<SubTheme> getSubThemes() {
        return subThemes;
    }

    public void setSubThemes(List<SubTheme> subThemes) {
        this.subThemes = subThemes;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
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