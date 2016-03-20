package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.CardServiceException;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;

import java.util.List;

/**
 * API to create, update and find cards.
 */
public interface CardService {

    /**
     *
     * Finds a card by a given id.
     * @param id the cardId
     * @return Card
     * @throws CardServiceException when the card does not exist
     */
    Card findCardById(int id) throws CardServiceException;

    /**
     * Creates the card and associates it with a theme.
     * @param card the card to save
     * @param themeId the id of the theme
     * @return the created card with Id
     * @throws CardServiceException when theme is not found
     */
    Card saveCard(Card card, Integer themeId) throws CardServiceException;

    /**
     * Reads cards from a csv file and creates them.
     * @param csvFileName the path to the csv file
     * @param themeId the id of the theme to add the cards to
     * @return a list of cards
     * @throws CardServiceException when the theme is not found or when something goes wrong with the conversion from csv
     */
    List<Card> createCardsfromCSV(String csvFileName, Integer themeId) throws CardServiceException;

    /**
     * Updates an existing card. Should have an id.
     * @param card the card to update
     * @return the updated card
     * @throws CardServiceException when the id is null
     */
    Card updateCard(Card card) throws CardServiceException;

}
