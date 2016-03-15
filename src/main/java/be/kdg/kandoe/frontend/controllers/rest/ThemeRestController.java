package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.DTO.SubThemeDTO;
import be.kdg.kandoe.frontend.DTO.ThemeDTO;
import be.kdg.kandoe.frontend.assemblers.CardAssembler;
import be.kdg.kandoe.frontend.assemblers.SubThemeAssembler;
import be.kdg.kandoe.frontend.assemblers.ThemeAssembler;
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

/**
 * Created by Jordan on 19/02/2016.
 */
@RestController
@RequestMapping(value = "/api/themes")
@ExposesResourceFor(ThemeDTO.class)
public class ThemeRestController {

    private final Logger logger = Logger.getLogger(OrganisationRestController.class);
    private final ThemeService themeService;
    private final ThemeAssembler themeAssembler;
    private final CardAssembler cardAssembler;
    private final SubThemeAssembler subThemeAssembler;
    private final MapperFacade mapper;

    @Autowired
    public ThemeRestController(ThemeService themeService, ThemeAssembler themeAssembler, CardAssembler cardAssembler,
                               SubThemeAssembler subThemeAssembler, MapperFacade mapper) {
        this.themeService = themeService;
        this.themeAssembler = themeAssembler;
        this.cardAssembler = cardAssembler;
        this.subThemeAssembler = subThemeAssembler;
        this.mapper = mapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ThemeDTO>> getThemes(){
        List<Theme> themes = themeService.findThemes();

        return new ResponseEntity<>(themeAssembler.toResources(themes), HttpStatus.OK);
    }

    @RequestMapping(value = "/{themeId}", method = RequestMethod.GET)
    public ResponseEntity<ThemeDTO> getThemeById(@PathVariable(value = "themeId") int themeId){
        Theme theme = themeService.findThemeById(themeId);

        return new ResponseEntity<>(themeAssembler.toResource(theme), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ThemeDTO> createTheme(@Valid @RequestBody ThemeDTO themeDTO,
                                                @AuthenticationPrincipal User user) {
        if (user != null && user.getId() != null) {
            if(themeDTO.getOrganisation() != null){
                Theme theme_in = mapper.map(themeDTO, Theme.class);

                Theme theme_out = themeService.saveTheme(theme_in, user.getId(), themeDTO.getOrganisation().getOrganisationId());
                logger.info(this.getClass().toString() + ": adding new theme " + theme_out.getId());

                return new ResponseEntity<>(themeAssembler.toResource(theme_out), HttpStatus.CREATED);
            }
            return new ResponseEntity<ThemeDTO>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<String> createTheme(@RequestPart("body") ThemeDTO themeDTO,
                                                     @RequestPart("file") MultipartFile file,
                                                     @AuthenticationPrincipal User user,
                                                     HttpServletRequest request) {

        if(user != null && user.getId() != null) {
            if(themeDTO.getOrganisation() != null){
                if(file.getContentType().split("/")[0].equals("image")){
                    Theme theme_in = mapper.map(themeDTO, Theme.class);
                    Theme theme_out = themeService.saveTheme(theme_in, user.getId(), themeDTO.getOrganisation().getOrganisationId());

                    String newFilename = String.format("%d.%s", theme_out.getId(), file.getOriginalFilename().split("\\.")[1]);
                    String filePath = request.getServletContext().getRealPath("/resources/images/themes/");

                    try {
                        FileUtils.saveFile(filePath, newFilename, file);
                    } catch (IOException e) {
                        return new ResponseEntity<>("Failed to save image", HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                    theme_out.setIconURL("resources/images/themes/" + newFilename);
                    themeService.updateTheme(theme_out);

                    return new ResponseEntity<>(HttpStatus.CREATED);
                }
                return new ResponseEntity<>("You have to select an image", HttpStatus.BAD_REQUEST);
            }
                return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public ResponseEntity<List<ThemeDTO>> getThemesCurrentUser(@AuthenticationPrincipal User user){
        if(user != null){
            List<Theme> themes = themeService.findThemeByCreator(user.getId());

            return new ResponseEntity<>(themeAssembler.toResources(themes), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/{themeId}/cards", method = RequestMethod.GET)
    public ResponseEntity<List<CardDTO>> getThemeCards(@AuthenticationPrincipal User user,
                                                       @PathVariable(value = "themeId") Integer themeId) {
        if(user != null){
            if(themeId != null){
                List<Card> cards = themeService.findThemeCards(themeId);
                return new ResponseEntity<List<CardDTO>>(cardAssembler.toResources(cards), HttpStatus.OK);
            }
            return new ResponseEntity<List<CardDTO>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<CardDTO>>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/{themeId}/subThemes", method = RequestMethod.GET)
    public ResponseEntity<List<SubThemeDTO>> getSubThemeByThemeId(@AuthenticationPrincipal User user,
                                                                  @PathVariable(value = "themeId") Integer themeId){
        if (user != null){
            if (themeId != null){
                List<SubTheme> subThemes = themeService.findThemeSubThemes(themeId);
                return new ResponseEntity<List<SubThemeDTO>>(subThemeAssembler.toResources(subThemes), HttpStatus.OK);
            }
            return new ResponseEntity<List<SubThemeDTO>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<SubThemeDTO>>(HttpStatus.UNAUTHORIZED);
    }
}
