package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.services.exceptions.ThemeServiceException;

import java.util.List;

/**
 * API to find, create and update themes
 */
public interface ThemeService {

    /**
     * Finds a theme by its id
     * Initializes the cards and subthemes
     * @param id the id of the theme
     * @return the theme
     * @throws ThemeServiceException when the id is null or the theme cannot be found.
     */
    Theme findThemeById(Integer id) throws ThemeServiceException;

    /**
     * Finds the themes that were created by the user
     * Initializes the cards and subthemes
     * @param userId the id of the creator
     * @return a list of themes
     * @throws ThemeServiceException when the user cannot be found.
     */
    List<Theme> findThemesByCreator(Integer userId) throws ThemeServiceException;

    /**
     * Creates a new theme. Description and name are required.
     * @param theme the theme to create
     * @param userId the id of the user taking the action
     * @param orgId the id of the organisation the theme is created for
     * @return the new theme with id
     * @throws ThemeServiceException
     */
    Theme saveTheme(Theme theme, Integer userId, Integer orgId) throws ThemeServiceException;

    /**
     * Updates an existing theme.
     * @param theme the theme to update
     * @return the updated theme
     * @throws ThemeServiceException when the is null
     */
    Theme updateTheme(Theme theme) throws ThemeServiceException;

    /**
     * Finds the cards of a theme
     * @param themeId the id of the theme
     * @return a list of cards
     * @throws ThemeServiceException when the theme cannot be found
     */
    List<Card> findThemesCards(Integer themeId) throws ThemeServiceException;

    /**
     * Finds the subthemes of a theme
     * @param themeId the id of the theme
     * @return a list of subthemes
     * @throws ThemeServiceException when the theme cannot be found
     */
    List<SubTheme> findThemeSubThemes(Integer themeId) throws ThemeServiceException;

}
