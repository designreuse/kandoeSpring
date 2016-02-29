package be.kdg.kandoe.frontend.DTO;


import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;

public class CardDTO extends ResourceSupport implements Serializable {
    private Integer cardId;

    @NotEmpty
    private String description;

    @NotEmpty
    private String imageURL;

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
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
}
