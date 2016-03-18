package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.assemblers.CardAssembler;
import be.kdg.kandoe.frontend.util.FileUtils;
import ma.glasnost.orika.MapperFacade;
import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.*;
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

    @RequestMapping(method = {RequestMethod.GET})
    public ResponseEntity<List<CardDTO>> getCards(@AuthenticationPrincipal User user) {
        if (user != null) {
            List<Card> cards = this.cardService.findCards();
            return new ResponseEntity<>(this.cardAssembler.toResources(cards), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{themeId}/csv", method = {RequestMethod.POST})
    public ResponseEntity<List<CardDTO>> createCardsFromCSV(@PathVariable("themeId") int themeId,
                                                            @RequestPart("csvFile") MultipartFile file,
                                                            @AuthenticationPrincipal User user,
                                                            HttpServletRequest request) throws IOException {
        if (user != null) {
            List<Card> cards = null;

            String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            String newFileName = String.format("%s.%s", file.getName(), extension);
            String path = request.getServletContext().getRealPath(String.format("/resources/csv/%d", themeId));

            path = FileUtils.saveFile(path, newFileName, file);

            try {
                cards = this.cardService.createCardsfromCSV(path);
                for(Card c : cards){
                    Card card_out = cardService.saveCard(c, themeId);
                    logger.info(this.getClass().toString() + ": adding new card " + card_out.getId());
                }
            } catch (ConvertorException e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(this.cardAssembler.toResources(cards), HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = {"/{cardId}"},method = {RequestMethod.GET})
    public ResponseEntity<CardDTO> getCardById(@PathVariable("cardId") int cardId, @AuthenticationPrincipal User user) {
        if(user != null){
            Card card = this.cardService.findCardById(cardId);
            return new ResponseEntity<>(cardAssembler.toResource(card), HttpStatus.OK);
        }
        return new ResponseEntity<CardDTO>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(method = {RequestMethod.POST})
    public ResponseEntity<CardDTO> createCard(@Valid @RequestBody CardDTO cardDTO,  @AuthenticationPrincipal User user) {
        if (user != null && user.getId() != null) {
            Card card_in = mapper.map(cardDTO, Card.class);
            Card card_out = cardService.saveCard(card_in, cardDTO.getThemeId());
            logger.info(this.getClass().toString() + ": adding new card " + card_out.getId());
            return new ResponseEntity<>(cardAssembler.toResource(card_out), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<CardDTO> createCard(@RequestPart("body") CardDTO cardDTO,
                                                     @RequestPart("file") MultipartFile file,
                                                     @AuthenticationPrincipal User user,
                                                     HttpServletRequest request) {

        if(user != null && user.getId() != null) {
            if(file.getContentType().split("/")[0].equals("image")){
                Card card_in = mapper.map(cardDTO, Card.class);
                Card card_out = cardService.saveCard(card_in, cardDTO.getThemeId());

                String newFilename = String.format("%d.%s", card_out.getId(), file.getOriginalFilename().split("\\.")[1]);
                String filePath = request.getServletContext().getRealPath("/resources/images/cards/");

                try {
                    FileUtils.saveFile(filePath, newFilename, file);
                } catch (IOException e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }

                card_out.setImageURL("resources/images/cards/" + newFilename);
                cardService.updateCard(card_out);
                return new ResponseEntity<>(cardAssembler.toResource(card_out), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
