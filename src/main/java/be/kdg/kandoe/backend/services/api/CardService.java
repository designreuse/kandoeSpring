package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;

import java.util.List;

/**
 * Created by Annelies on 22/02/2016.
 */

public interface CardService {
    Card findCardById(int id);
    Card findCardByDescription(String description);
    Card saveCard(Card card, Integer themeId);
    List<Card> findCards();
    List<Card> createCardsfromCSV(String csvFileName) throws ConvertorException;


    Card updateCard(Card card);

}
