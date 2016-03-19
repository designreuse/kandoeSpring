package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;

import java.util.List;
import java.util.Set;

public interface SubThemeService {
    SubTheme findSubThemeById(int id);
    SubTheme findSubThemeByName(String name);
    SubTheme saveSubTheme(SubTheme subTheme, Integer userId, Integer headThemeId);
    List<SubTheme> findSubThemes();
    SubTheme updateSubTheme(SubTheme subTheme);
    Set<SubTheme> findSubThemeByCreator(Integer userId);
    Set<Card> findSubThemeCards(Integer subThemeId);
    SubTheme addCards(Integer subThemeId,Set<Card> cards);

}
