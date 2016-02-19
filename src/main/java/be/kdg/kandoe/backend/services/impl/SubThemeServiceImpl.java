package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.SubThemeRepository;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Annelies on 19/02/2016.
 */
public class SubThemeServiceImpl implements SubThemeService {
    private final SubThemeRepository subThemeRepository;
    private final ThemeRepository themeRepository;

    @Autowired
    public SubThemeServiceImpl(SubThemeRepository subThemeRepository, ThemeRepository themeRepository) {
        this.subThemeRepository = subThemeRepository;
        this.themeRepository = themeRepository;
    }

    @Override
    public SubTheme findSubThemeById(int id) {
        return subThemeRepository.findOne(id);
    }

    @Override
    public SubTheme findSubThemeByName(String name) {
        return subThemeRepository.findSubThemeBySubThemeName(name);
    }

    @Override
    public SubTheme saveSubTheme(SubTheme subTheme, Theme headthemeId) {
    return null;
    }

    @Override
    public List<SubTheme> findSubThemes() {
        return subThemeRepository.findAll();
    }
}
