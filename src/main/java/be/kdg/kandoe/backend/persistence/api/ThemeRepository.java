package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Jordan on 16/02/2016.
 */
public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    Theme findThemeByThemeName(String themeName);
}
