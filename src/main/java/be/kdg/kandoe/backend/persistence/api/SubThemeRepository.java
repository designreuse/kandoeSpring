package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Annelies on 19/02/2016.
 */
public interface SubThemeRepository extends JpaRepository<SubTheme, Integer> {
    SubTheme findSubThemeByThemeName(String subThemeName);
}
