package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.SubThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Annelies on 19/02/2016.
 */

@Service
@Transactional
public class SubThemeServiceImpl implements SubThemeService {
    private final SubThemeRepository subThemeRepository;
    private final ThemeService themeService;
    private final UserService userService;
    private final UserRepository userRepository;


    @Autowired
    public SubThemeServiceImpl(SubThemeRepository subThemeRepository, ThemeService themeService, UserService userService, UserRepository userRepository) {
        this.subThemeRepository = subThemeRepository;
        this.themeService = themeService;
        this.userService = userService;
        this.userRepository = userRepository;
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
    public SubTheme saveSubTheme(SubTheme subTheme,Integer userId, Integer themeId) {
        User creator = userRepository.getOne(userId);
        subTheme.setCreator(creator);

        Theme theme = themeService.findThemeById(themeId);
        Set<SubTheme> subThemes=creator.getSubThemes();

        subTheme.setTheme(theme);
        subTheme = subThemeRepository.save(subTheme);

        if (subThemes== null){
            subThemes = new HashSet<>();
        }
        subThemes.add(subTheme);
        theme.setSubThemes(subThemes);
        creator.setSubThemes(subThemes);
        subTheme.setTheme(theme);
        themeService.updateTheme(theme);

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

    @Override
    public Set<SubTheme> findSubThemeByCreator(Integer userId) {
        User creator = userService.findUserById(userId);

        Hibernate.initialize(creator.getSubThemes());
        Set<SubTheme> subThemes = creator.getSubThemes();
        subThemes.stream().forEach(t -> {
            Hibernate.initialize(t.getCards());
           /* if(t.getSubThemes() != null)
                Hibernate.initialize(t.getSubThemes());*/
        });
        return creator.getSubThemes();
    }

    @Override
    public List<Card> findSubThemeCards(Integer themeId) {
        SubTheme subTheme = findSubThemeById(themeId);

        Hibernate.initialize(subTheme.getCards());
        subTheme.getCards().stream().forEach(c -> Hibernate.initialize(c.getCardSessions()));
        return subTheme.getCards();
    }
}
