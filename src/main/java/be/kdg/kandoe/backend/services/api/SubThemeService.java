package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import javafx.scene.media.SubtitleTrack;

import java.util.List;

/**
 * Created by Annelies on 16/02/2016.
 */
public interface SubThemeService {
    SubTheme findSubThemeById(int id);
    SubTheme findSubThemeByName(String name);
    SubTheme saveSubTheme(SubTheme subTheme, Integer headThemeId);
    List<SubTheme> findSubThemes();

    void deleteSubThemeById(int id);
    SubTheme updateSubThemeById(SubTheme subTheme);

}
