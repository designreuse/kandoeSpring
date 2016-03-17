package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.CardRepository;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.convertors.CsvToCardConvertor;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Annelies on 22/02/2016.
 */

@Service
@Transactional
public class CardServiceImpl implements CardService {


    private final CardRepository cardRepository;
    private final ThemeService themeService;
    private final CsvToCardConvertor cardConvertor;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, ThemeService themeService, CsvToCardConvertor cardConvertor) {
        this.cardRepository = cardRepository;
        this.themeService = themeService;
        this.cardConvertor = cardConvertor;
    }

    @Override
    public Card findCardById(int id) {
        return cardRepository.findOne(id);
    }

    @Override
    public Card findCardByDescription(String description) {
        return cardRepository.findCardByDescription(description);
    }

    @Override

    public Card saveCard(Card card, Integer themeId) {
        Theme theme = themeService.findThemeById(themeId);
        card.setTheme(theme);

        List<Card> themeCards = theme.getCards();
        if(themeCards == null){
            themeCards = new ArrayList<>();
        }
        themeCards.add(card);
        theme.setCards(themeCards);

        return cardRepository.save(card);
    }

    @Override
    public List<Card> findCards() {
        return cardRepository.findAll();
    }

    @Override
    public List<Card> createCardsfromCSV(String csvFileName) throws ConvertorException {
       return cardConvertor.toCards(csvFileName);

    }

    @Override
    public Card updateCard(Card card) {
        return cardRepository.save(card);
    }



}
