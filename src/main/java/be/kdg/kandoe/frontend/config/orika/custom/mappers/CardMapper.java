package be.kdg.kandoe.frontend.config.orika.custom.mappers;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;

@Component
public class CardMapper extends CustomMapper<Card, CardDTO>{
    @Override
    public void mapAtoB(Card card, CardDTO cardDTO, MappingContext context) {
        if(card.getTheme() != null)
            cardDTO.setThemeId(card.getTheme().getThemeId());
    }

    @Override
    public void mapBtoA(CardDTO cardDTO, Card card, MappingContext context) {
        super.mapBtoA(cardDTO, card, context);
    }
}
