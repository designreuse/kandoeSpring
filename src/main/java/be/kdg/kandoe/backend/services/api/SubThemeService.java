package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;

import java.util.List;

public interface SubThemeService {
    SubTheme findSubThemeById(int id);
    SubTheme findSubThemeByName(String name);
    SubTheme saveSubTheme(SubTheme subTheme, Integer headThemeId);
    List<SubTheme> findSubThemes();
    SubTheme updateSubTheme(SubTheme subTheme);

/*    List<SubTheme> findSubThemeByCreator(Integer userId);*/
    List<Card> findSubThemeCards(Integer themeId);

}
