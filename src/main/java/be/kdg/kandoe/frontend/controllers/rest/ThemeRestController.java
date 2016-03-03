package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import be.kdg.kandoe.frontend.DTO.ThemeDTO;
import be.kdg.kandoe.frontend.assemblers.OrganisationAssembler;
import be.kdg.kandoe.frontend.assemblers.ThemeAssembler;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
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
    private final MapperFacade mapper;

    @Autowired
    public ThemeRestController(ThemeService themeService, ThemeAssembler themeAssembler, MapperFacade mapper) {
        this.themeService = themeService;
        this.themeAssembler = themeAssembler;
        this.mapper = mapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ThemeDTO>> getThemes(){
        List<Theme> themes = themeService.findThemes();

        return new ResponseEntity<>(themeAssembler.toResources(themes), HttpStatus.OK);
    }

    @RequestMapping(value = "/{themeId}", method = RequestMethod.GET)
    public ResponseEntity<ThemeDTO> getOrganisationById(@PathVariable(value = "themeId") int themeId){
        Theme theme = themeService.findThemeById(themeId);
        System.out.println(theme.getOrganisation().getOrganisationName());
        return new ResponseEntity<>(themeAssembler.toResource(theme), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ThemeDTO> createOrganisation(@Valid @RequestBody ThemeDTO themeDTO,
                                                       @AuthenticationPrincipal User user) {
        if (user != null && user.getId() != null) {
            Theme theme_in = mapper.map(themeDTO, Theme.class);

            Theme theme_out = themeService.saveTheme(theme_in, user.getId());
            logger.info(this.getClass().toString() + ": adding new theme " + theme_out.getId());

            return new ResponseEntity<>(themeAssembler.toResource(theme_out), HttpStatus.CREATED);
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
}
