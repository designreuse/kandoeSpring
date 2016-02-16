package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;

import java.util.List;

/**
 * Created by Annelies on 16/02/2016.
 */
public interface SubThemeService {
    SubTheme findSubThemeById(int Id);

    SubTheme findSubThemeByName(String name);

    SubTheme saveSubTheme(SubTheme subTheme, Theme headtheme);

    List<SubTheme> findSubThemes();
}
