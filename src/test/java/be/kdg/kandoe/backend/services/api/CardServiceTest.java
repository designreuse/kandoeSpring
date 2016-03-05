package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class CardServiceTest {


    @Autowired
    private CardService cardService;
    @Autowired
    private ThemeService themeService;

    @Test
    @Before
    public void testSaveCards() {
        Card card = new Card("KdG Card description");

        cardService.saveCard(card, 1);
        Theme theme = new Theme("KdGCard");
        theme.setDescription("KdGCard Theme Description");
        themeService.saveTheme(theme, 1,1);

         card.setTheme(new Theme("KdGCard"));

        assertNotNull("Card should have an id", card.getId());
    }

    @Test
    public void testUpdateCard(){
        Card card = cardService.findCardById(1);
        card.setDescription("CardUpdate");
        cardService.updateCard(card);

        assertEquals("Card description should be 'CardUpdate'", "CardUpdate", cardService.findCardById(1).getDescription());
    }



}

