package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jordan on 16/02/2016.
 */
@Service
@Transactional
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public ThemeServiceImpl(ThemeRepository themeRepository, UserRepository userRepository, UserService userService) {
        this.themeRepository = themeRepository;
        this.userRepository=userRepository;
        this.userService = userService;
    }

    @Override
    public Theme findThemeById(int Id) {
        return themeRepository.findOne(Id);
    }

    @Override
    public Theme findThemeByName(String name) {
        return themeRepository.findThemeByThemeName(name);
    }

    @Override
    public Theme saveTheme(Theme theme, Integer userId) {
        User creator = userRepository.getOne(userId);
        theme.setCreator(creator);

        List<Theme> themes = creator.getThemes();
        if(themes == null){
            themes = new ArrayList<>();
        }
        themes.add(theme);
        creator.setThemes(themes);

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
        Theme theme = findThemeById(id);

        User u = theme.getCreator();
        List<Theme> themes = u.getThemes();
        themes.remove(theme);
        u.setThemes(themes);
        theme.setCreator(u);

        themeRepository.delete(id);
    }

    @Override
    public List<Theme> findThemeByCreator(Integer userId) {
        User creator = userService.findUserById(userId);

        //loads the themes
        //to prevent org.hibernate.LazyInitializationException: failed to lazily initialize a collection of role
        //http://stackoverflow.com/questions/5027013/hibernate-lazy-load-application-design
        Hibernate.initialize(creator.getThemes());
        return creator.getThemes();
    }
}
