package be.kdg.kandoe.frontend.assemblers;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.frontend.DTO.SubThemeDTO;
import be.kdg.kandoe.frontend.controllers.rest.ThemeRestController;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class SubThemeAssembler  extends ResourceAssemblerSupport<SubTheme, SubThemeDTO> {

    private MapperFacade mapper;

    @Autowired
    public SubThemeAssembler(MapperFacade mapper) {
        super(ThemeRestController.class, SubThemeDTO.class);
        this.mapper = mapper;
    }

    @Override
    public List<SubThemeDTO> toResources(Iterable<? extends SubTheme> entities) {
        return StreamSupport
                .stream(entities.spliterator(), false)
                .map(r -> toResource(r))
                .collect(Collectors.toList());
    }

    @Override
    public SubThemeDTO toResource(SubTheme entity) {
        SubThemeDTO subThemeDTO = mapper.map(entity, SubThemeDTO.class);

        subThemeDTO.setThemeId(entity.getId());
        return subThemeDTO;
    }

}
