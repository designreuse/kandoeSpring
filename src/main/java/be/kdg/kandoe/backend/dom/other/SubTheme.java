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
public class SubTheme extends Theme implements Serializable, Identifiable<Integer> {
    public SubTheme(String themeName, Theme theme) {
        super(themeName);
        this.theme = theme;
    }

    public SubTheme() {
    }

    public Theme getTheme() {
        return theme;
    }

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.EAGER)
    private Theme theme;

}

