package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.services.exceptions.SubThemeServiceException;

import java.util.List;
import java.util.Set;

/**
 * API to find, create and update subthemes
 */
public interface SubThemeService {

    /**
     * Finds the subtheme by an id.
     * @param id the id of the subtheme
     * @return the subtheme
     * @throws SubThemeServiceException when subtheme is null
     */
    SubTheme findSubThemeById(int id) throws SubThemeServiceException;

    /**
     * Finds the subthemes that were created by a user
     * Initializes cards.
     * @param userId the id of the user
     * @return a set of subthemes
     * @throws SubThemeServiceException
     */
    Set<SubTheme> findSubThemesByCreator(Integer userId) throws SubThemeServiceException;

    /**
     * Creates a new subtheme. The name and description are required.
     * @param subTheme the subtheme to create
     * @param userId the id of the user taking the action
     * @param headThemeId the id of the theme this subtheme belongs to
     * @return the new subtheme
     * @throws SubThemeServiceException
     */
    SubTheme saveSubTheme(SubTheme subTheme, Integer userId, Integer headThemeId) throws SubThemeServiceException;

    /**
     * Updates an existing subtheme.
     * @param subTheme the subtheme to update
     * @return the updated subtheme
     * @throws SubThemeServiceException when the id is null
     */
    SubTheme updateSubTheme(SubTheme subTheme) throws SubThemeServiceException;

    /**
     * Finds the cards of a subtheme.
     * @param subThemeId the id of the subtheme
     * @return a set of cards
     * @throws SubThemeServiceException when the subtheme cannot be found.
     */
    Set<Card> findSubThemeCards(Integer subThemeId) throws SubThemeServiceException;

}
