package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.controllers.rest.CardRestController;
import ma.glasnost.orika.MapperFacade;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class CardAssembler extends ResourceAssemblerSupport<Card, CardDTO> {

    private MapperFacade mapper;
    @Autowired
    public CardAssembler(MapperFacade mapper) {
        super(CardRestController.class, CardDTO.class);
        this.mapper = mapper;
    }

    @Override
    public List<CardDTO> toResources(Iterable<? extends Card> entities) {
        return StreamSupport
                .stream(entities.spliterator(), false)
                .map(r -> toResource(r))
                .collect(Collectors.toList());
    }

    @Override
    public CardDTO toResource(Card entity) {
        CardDTO cardDTO = mapper.map(entity, CardDTO.class);

        cardDTO.setCardId(entity.getId());

        return cardDTO;
    }
}
