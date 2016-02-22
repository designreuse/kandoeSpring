package be.kdg.kandoe.backend.services.convertors;

import be.kdg.kandoe.backend.dom.game.Card;

import java.util.Collection;

/**
 * Conversions from a String or a file to a certain format
 */
public interface CardConvertorAdapter {

    /**
     *
     * @param file : a file containing multiple values to be converted into a Message object
     * @return This conversion method returns a collection of Message objects
     * @throws ConvertorException
     */

    Collection<Card> toCards(String file) throws ConvertorException;

    /**
     *
     * @param string
     * @return This conversion method converts the given String into a Message object
     * @throws ConvertorException
     */

    Card toCard(String string) throws ConvertorException;
}
