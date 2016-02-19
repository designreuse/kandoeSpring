package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Jordan on 16/02/2016.
 */
@Service
@Transactional
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final UserRepository userRepository;

    @Autowired
    public ThemeServiceImpl(ThemeRepository themeRepository,UserRepository userRepository) {
        this.themeRepository = themeRepository;
        this.userRepository=userRepository;
    }

    @Override
    public Theme findThemeById(int Id) {
        return themeRepository.findOne(Id);
    }

    @Override
    public Theme findTHemeByName(String name) {
        return themeRepository.findThemeByThemeName(name);
    }

    @Override
    public Theme saveTheme(Theme theme, Integer userId) {
        User creator = userRepository.getOne(userId);
        theme.setCreator(creator);

        return themeRepository.save(theme);
    }

    @Override
    public List<Theme> findThemes() {
        return themeRepository.findAll();
    }

    @Override
    public Theme updateTheme(Theme theme) {
        return themeRepository.save(theme);
    }

    @Override
    public void removeTheme(int id) {
        themeRepository.delete(id);
    }
}
