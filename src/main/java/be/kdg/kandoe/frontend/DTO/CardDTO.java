package be.kdg.kandoe.frontend.DTO;


import be.kdg.kandoe.backend.dom.game.CardSession;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.hateoas.ResourceSupport;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;


public class CardDTO extends ResourceSupport implements Serializable {
    private Integer cardId;
    @NotNull
    private String description;

    private String imageURL;
    //private ThemeDTO theme;
    //private List<CardSessionDTO> cardSessions;
    private Integer themeId;

    public CardDTO() {
    }

    public Integer getCardId() {
        return this.cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

   /* public ThemeDTO getTheme() {
        return this.theme;
    }

    public void setTheme(ThemeDTO theme) {
        this.theme = theme;
    }*/

    /*public List<CardSessionDTO> getCardSessions() {
        return this.cardSessions;
    }

    public void setCardSessions(List<CardSessionDTO> cardSessions) {
        this.cardSessions = cardSessions;
    }*/

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }
}
