package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.CardRepository;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.convertors.CsvToCardConvertor;
import be.kdg.kandoe.backend.services.exceptions.CardServiceException;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import be.kdg.kandoe.backend.services.exceptions.SubThemeServiceException;
import be.kdg.kandoe.backend.services.exceptions.ThemeServiceException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional(rollbackOn = {CardServiceException.class})
public class CardServiceImpl implements CardService {

    private final Logger logger = Logger.getLogger(CardServiceImpl.class);
    private final CardRepository cardRepository;
    private final ThemeService themeService;
    private final CsvToCardConvertor cardConvertor;
    private final SubThemeService subThemeService;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, ThemeService themeService, CsvToCardConvertor cardConvertor, SubThemeService subThemeService) {
        this.cardRepository = cardRepository;
        this.themeService = themeService;
        this.cardConvertor = cardConvertor;
        this.subThemeService = subThemeService;
    }

    @Override
    public Card findCardById(int id) throws CardServiceException {
        logger.info(this.getClass().toString() + ": finding card with id " + id);
        Card c = cardRepository.findOne(id);

        if (c == null) {
            logger.warn(this.getClass().toString() + ": failed to find card with id " + id);
            throw new CardServiceException("Failed to find card with id " + id);
        }

        logger.info(this.getClass().toString() + ": found card with id " + id);
        return c;
    }

    @Override
    public Card saveCard(Card card, Integer themeId) throws CardServiceException {
        logger.info(this.getClass().toString() + ": adding new card");
        Theme theme = null;

        try {
            theme = themeService.findThemeById(themeId);
        } catch (ThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": trying to add a card to non existing theme");
            throw new CardServiceException(e.getMessage(), e);
        }
        card.setTheme(theme);

        Set<Card> themeCards = theme.getCards();
        if (themeCards == null) {
            themeCards = new HashSet<>();
        }
        themeCards.add(card);
        theme.setCards(themeCards);

        Card c = cardRepository.save(card);
        logger.info(this.getClass().toString() + ": added new card " + c.getId());
        return c;
    }

    @Override
    public List<Card> createCardsfromCSV(String csvFileName, Integer themeId) throws CardServiceException {
        logger.info(this.getClass().toString() + ": creating cards from csv");
        List<Card> cards_in = null;
        try {
            cards_in = cardConvertor.toCards(csvFileName);
        } catch (ConvertorException e) {
            logger.warn(this.getClass().toString() + ": failed to create cards from csv");
            throw new CardServiceException("Failed to create cards from csv", e);
        }
        List<Card> cards_out = new ArrayList<>();

        for (Card card : cards_in) {
            card = saveCard(card, themeId);
            cards_out.add(card);
        }

        logger.info(this.getClass().toString() + ": created cards from csv");
        return cards_out;
    }

    @Override
    public Card updateCard(Card card) throws CardServiceException {
        logger.info(this.getClass().toString() + ": updating card with id " + card.getCardId());

        if (card.getCardId() == null) {
            logger.warn(this.getClass().toString() + "cannot update card without an id");
            throw new CardServiceException("Cannot update card without an id");
        }

        Card c = cardRepository.save(card);

        logger.info(this.getClass().toString() + ": updated card with id " + card.getCardId());
        return c;
    }


    @Override
    public Card saveCardForSubTheme(Card card, Integer subThemeId) throws CardServiceException {
        logger.info(this.getClass().toString() + ": adding new card");
        SubTheme subTheme = null;

        try {
            subTheme = subThemeService.findSubThemeById(subThemeId);
        } catch (SubThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": trying to add a card to non existing subtheme");
            throw new CardServiceException(e.getMessage(), e);
        }
        card.setTheme(subTheme.getTheme());
        card.setSubTheme(subTheme);

        Set<Card> themeCards = subTheme.getTheme().getCards();
        boolean containsCard = false;
        for (Card c : themeCards) {
            if (c.getId() == card.getId()) {
                containsCard = true;
            }
        }
        if (!containsCard) {
            themeCards.add(card);
        }

        subTheme.getTheme().setCards(themeCards);

        containsCard = false;
        Set<Card> subThemeCards = subTheme.getCards();
        if (subThemeCards == null) {
            subThemeCards = new HashSet<>();
        }
        for (Card c : subThemeCards) {
            do {
                if (c.getId() == card.getId()) {
                    containsCard=true;
                    card.setCardId(card.getCardId()+1);
                    System.out.println("Id went up to: " + card.getId());
                }
            } while (containsCard);
        }
        subThemeCards.add(card);
        subTheme.setCards(subThemeCards);

        Card c = cardRepository.save(card);
        logger.info(this.getClass().toString() + ": added new card " + c.getId());
        return c;
    }
}
