package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import be.kdg.kandoe.frontend.DTO.ThemeDTO;
import be.kdg.kandoe.frontend.controllers.rest.OrganisationRestController;
import be.kdg.kandoe.frontend.controllers.rest.ThemeRestController;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by Jordan on 19/02/2016.
 */
@Component
public class ThemeAssembler extends ResourceAssemblerSupport<Theme, ThemeDTO> {

    private MapperFacade mapper;

    @Autowired
    public ThemeAssembler(MapperFacade mapper) {
        super(ThemeRestController.class, ThemeDTO.class);
        this.mapper = mapper;
    }

    @Override
    public List<ThemeDTO> toResources(Iterable<? extends Theme> entities) {
        return StreamSupport
                .stream(entities.spliterator(), false)
                .map(r -> toResource(r))
                .collect(Collectors.toList());
    }

    @Override
    public ThemeDTO toResource(Theme entity) {
        ThemeDTO themeDTO = mapper.map(entity, ThemeDTO.class);
        if(entity.getSubThemes() != null){
            themeDTO.setCountSubthemes(entity.getSubThemes().size());
        }

        themeDTO.setThemeId(entity.getId());
        return themeDTO;
    }
}