package be.kdg.kandoe.frontend.DTO;


import org.springframework.hateoas.ResourceSupport;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;


public class CardDTO extends ResourceSupport implements Serializable {
    private Integer cardId;
    @NotNull
    private String description;

    private String imageURL;
     private Integer themeId;
    private int position;

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

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
