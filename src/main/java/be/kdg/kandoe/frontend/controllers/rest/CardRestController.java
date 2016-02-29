package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.assemblers.CardAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/cards")
@ExposesResourceFor(CardDTO.class)
public class CardRestController {

    private final Logger logger = Logger.getLogger(CardRestController.class);
    private final CardService cardService;
    private final CardAssembler cardAssembler;
    private final MapperFacade mapper;

    @Autowired
    public CardRestController(CardService cardService, CardAssembler cardAssembler, MapperFacade mapper) {
        this.cardService = cardService;
        this.cardAssembler = cardAssembler;
        this.mapper = mapper;
    }


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CardDTO>> getCards(@AuthenticationPrincipal User user) {
        if (user != null) {
            List<Card> cards = cardService.findCards();

            return new ResponseEntity<>(cardAssembler.toResources(cards), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @RequestMapping(value = "/{cardId}", method = RequestMethod.GET)
    public ResponseEntity<CardDTO> getCardById(@PathVariable(value = "cardId") int cardId) {
        Card card = cardService.findCardById(cardId);
        return new ResponseEntity<>(cardAssembler.toResource(card), HttpStatus.OK);
    }
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CardDTO> createCard(@Valid @RequestBody CardDTO cardDTO, @AuthenticationPrincipal User user, Theme theme) {
        if (user != null && user.getId() != null) {
            Card card_in = mapper.map(cardDTO, Card.class);

            Card card_out = cardService.saveCard(card_in, theme.getId());
            logger.info(this.getClass().toString() + ": adding new card " + card_out.getId());

            return new ResponseEntity<>(cardAssembler.toResource(card_out), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
