package be.kdg.kandoe.backend.dom.other;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class SubTheme extends Theme implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "SubThemeId", nullable = false)
    @GeneratedValue
    private Integer subThemeId;

    @Column(name = "SubThemeName", nullable = false)
    private String subThemeName;

    public SubTheme(String themeName) {
        super(themeName);
    }

    public SubTheme(Theme theme) {
        this.theme = theme;
    }

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.EAGER)
    private Theme theme;

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
}
