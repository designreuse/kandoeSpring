package be.kdg.kandoe.backend.dom.other;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class SubTheme extends Theme implements Serializable, Identifiable<Integer> {

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.EAGER)
    private Theme theme;

}
