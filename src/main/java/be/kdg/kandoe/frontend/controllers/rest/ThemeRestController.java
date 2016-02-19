package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

        return new ResponseEntity<>(themeAssembler.toResource(theme), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ThemeDTO> createOrganisation(@Valid @RequestBody ThemeDTO themeDTO){
        Theme incTheme= mapper.map(themeDTO, Theme.class);

        //todo change to currently logged in user
        Theme outTheme = themeService.saveTheme(incTheme, 1);
        logger.info(this.getClass().toString() + ": adding new Theme " + outTheme.getId());

        return new ResponseEntity<>(themeAssembler.toResource(outTheme), HttpStatus.CREATED);
    }
}
