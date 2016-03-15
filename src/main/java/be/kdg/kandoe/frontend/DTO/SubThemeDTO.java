package be.kdg.kandoe.frontend.DTO;


import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;
import java.util.List;

public class SubThemeDTO extends ResourceSupport implements Serializable {

    private Integer subThemeId;

    private String subThemeName;

    private String description;

    private String iconURL;

    private OrganisationDTO organisation;

    private List<CardDTO> cards;

    private Integer themeId;

    public Integer getSubThemeId() {
        return subThemeId;
    }

    public void setSubThemeId(Integer subThemeId) {
        this.subThemeId = subThemeId;
    }

    public String getSubThemeName() {
        return subThemeName;
    }

    public void setSubThemeName(String subThemeName) {
        this.subThemeName = subThemeName;
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
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

    public OrganisationDTO getOrganisation() {
        return organisation;
    }

    public void setOrganisation(OrganisationDTO organisation) {
        this.organisation = organisation;
    }

    public List<CardDTO> getCards() {
        return cards;
    }

    public void setCards(List<CardDTO> cards) {
        this.cards = cards;
    }

 }
