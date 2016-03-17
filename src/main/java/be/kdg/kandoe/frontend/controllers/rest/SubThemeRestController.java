package be.kdg.kandoe.frontend.controllers.rest;


import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.DTO.SubThemeDTO;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import be.kdg.kandoe.frontend.assemblers.CardAssembler;
import be.kdg.kandoe.frontend.assemblers.SubThemeAssembler;
import be.kdg.kandoe.frontend.util.FileUtils;
import ma.glasnost.orika.MapperFacade;
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
import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/subThemes")
@ExposesResourceFor(SubThemeDTO.class)
public class SubThemeRestController {
    private final Logger logger = Logger.getLogger(OrganisationRestController.class);
    private final SubThemeService subThemeService;
    private final SubThemeAssembler subThemeAssembler;
    private final CardAssembler cardAssembler;
    private final MapperFacade mapper;

    @Autowired
    public SubThemeRestController(SubThemeService subThemeService, SubThemeAssembler subThemeAssembler, CardAssembler cardAssembler,
                                  MapperFacade mapper) {
        this.subThemeService = subThemeService;
        this.subThemeAssembler = subThemeAssembler;
        this.cardAssembler = cardAssembler;
        this.mapper = mapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<SubThemeDTO>> getSubThemes(){
        List<SubTheme> subThemes = subThemeService.findSubThemes();

        return new ResponseEntity<>(subThemeAssembler.toResources(subThemes), HttpStatus.OK);
    }

    @RequestMapping(value = "/{themeId}", method = RequestMethod.GET)
    public ResponseEntity<SubThemeDTO> getSubThemeById(@PathVariable(value = "themeId") int themeId){
        SubTheme subTheme = subThemeService.findSubThemeById(themeId);

       return new ResponseEntity<>(subThemeAssembler.toResource(subTheme), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<SubThemeDTO> createSubTheme(@Valid @RequestBody SubThemeDTO subThemeDTO,
                                                @AuthenticationPrincipal User user) {
        if (user != null && user.getId() != null) {
            if(subThemeDTO.getOrganisation() != null){
                SubTheme subTheme_in = mapper.map(subThemeDTO, SubTheme.class);

                SubTheme subTheme_out = subThemeService.saveSubTheme(subTheme_in,user.getUserId() ,subThemeDTO.getThemeId());
                logger.info(this.getClass().toString() + ": adding new subtheme " + subTheme_out.getId());

                return new ResponseEntity<>(subThemeAssembler.toResource(subTheme_out), HttpStatus.CREATED);
            }
            return new ResponseEntity<SubThemeDTO>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<String> createSubTheme(@RequestPart("body") SubThemeDTO subThemeDTO,
                                              @RequestPart("file") MultipartFile file,
                                              @AuthenticationPrincipal User user,
                                              HttpServletRequest request) {

        if(user != null && user.getId() != null) {
            if(subThemeDTO.getOrganisation() != null){
                if(file.getContentType().split("/")[0].equals("image")){
                    SubTheme subTheme_in = mapper.map(subThemeDTO, SubTheme.class);
                    SubTheme subTheme_out = subThemeService.saveSubTheme(subTheme_in, user.getUserId(),subThemeDTO.getThemeId());

                    String newFilename = String.format("%d.%s", subTheme_out.getId(), file.getOriginalFilename().split("\\.")[1]);
                    String filePath = request.getServletContext().getRealPath("/resources/images/subThemes/");

                    try {
                        FileUtils.saveFile(filePath, newFilename, file);
                    } catch (IOException e) {
                        return new ResponseEntity<>("Failed to save image", HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                    subTheme_out.setIconURL("resources/images/subThemes/" + newFilename);
                    subThemeService.updateSubTheme(subTheme_out);

                    return new ResponseEntity<>(HttpStatus.CREATED);
                }
                return new ResponseEntity<>("You have to select an image", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public ResponseEntity<List<SubThemeDTO>> getSubThemesCurrentUser(@AuthenticationPrincipal User user){
        if(user != null){
            Set<SubTheme> subThemes = subThemeService.findSubThemeByCreator(user.getId());

            return new ResponseEntity<>(subThemeAssembler.toResources(subThemes), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/{themeId}/cards", method = RequestMethod.GET)
    public ResponseEntity<List<CardDTO>> getSubThemeCards(@AuthenticationPrincipal User user,
                                                       @PathVariable(value = "themeId") Integer themeId) {
        if(user != null){
            if(themeId != null){
                List<Card> cards = subThemeService.findSubThemeCards(themeId);
                return new ResponseEntity<List<CardDTO>>(cardAssembler.toResources(cards), HttpStatus.OK);
            }
            return new ResponseEntity<List<CardDTO>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<CardDTO>>(HttpStatus.UNAUTHORIZED);
    }


}
