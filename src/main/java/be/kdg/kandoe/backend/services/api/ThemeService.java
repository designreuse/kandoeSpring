package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;

import java.util.List;

/**
 * Created by Jordan on 16/02/2016.
 */
public interface ThemeService {

    Theme findThemeById(int Id);

    Theme findThemeByName(String name);

    Theme saveTheme(Theme theme, Integer userId);

    List<Theme> findThemes();

    Theme updateTheme(Theme theme);

    void removeTheme(int id);
}
