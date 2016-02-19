package be.kdg.kandoe.frontend.DTO;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Tag;
import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Jordan on 19/02/2016.
 */
public class ThemeDTO extends ResourceSupport implements Serializable {

    private Integer themeId;

    private String themeName;

    private String description;

    private String iconURL;

    private Organisation organisation;


}
