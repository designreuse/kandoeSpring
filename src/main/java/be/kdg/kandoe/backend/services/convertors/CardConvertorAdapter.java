package be.kdg.kandoe.backend.services.convertors;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;

import java.util.Collection;

/**
 * Conversions from a String or a file to a Card
 */
public interface CardConvertorAdapter {

    /**
     *
     * @param file : a file containing multiple values to be converted into a Card object
     * @return This conversion method returns a collection of Card objects
     * @throws ConvertorException
     */

    Collection<Card> toCards(String file) throws ConvertorException;
}
