package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.SubThemeRepository;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Annelies on 19/02/2016.
 */

@Service
@Transactional
public class SubThemeServiceImpl implements SubThemeService {
    private final SubThemeRepository subThemeRepository;

    @Autowired
    public SubThemeServiceImpl(SubThemeRepository subThemeRepository) {
        this.subThemeRepository = subThemeRepository;
    }

    @Override
    public SubTheme findSubThemeById(int id) {
        return subThemeRepository.findOne(id);
    }

    @Override
    public SubTheme findSubThemeByName(String name) {
        return subThemeRepository.findSubThemeByThemeName(name);
    }

    @Override
    public SubTheme saveSubTheme(SubTheme subTheme, Integer headThemeId) {
        return subThemeRepository.save(subTheme);
    }

    @Override
    public List<SubTheme> findSubThemes() {
        return subThemeRepository.findAll();
    }


    @Override
    public SubTheme updateSubTheme(SubTheme subTheme) {
                     return subThemeRepository.save(subTheme);
    }
}
