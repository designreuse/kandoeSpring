package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
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
    private final OrganisationService organisationService;

    @Autowired
    public ThemeServiceImpl(ThemeRepository themeRepository, UserRepository userRepository, UserService userService, OrganisationService organisationService) {
        this.themeRepository = themeRepository;
        this.userRepository=userRepository;
        this.userService = userService;
        this.organisationService = organisationService;
    }

    @Override
    public Theme findThemeById(int Id) {
        Theme theme = themeRepository.findOne(Id);
        if(theme != null && theme.getCards() != null)
            Hibernate.initialize(theme.getCards());

        return theme;
    }

    @Override
    public Theme findThemeByName(String name) {
        return themeRepository.findThemeByThemeName(name);
    }

    @Override
    public Theme saveTheme(Theme theme, Integer userId, Integer orgId) {
        User creator = userRepository.getOne(userId);
        theme.setCreator(creator);

        List<Theme> themes = creator.getThemes();
        if(themes == null){
            themes = new ArrayList<>();
        }
        themes.add(theme);
        creator.setThemes(themes);

        Organisation org = organisationService.findOrganisationById(orgId);
        List<Theme> orgThemes = org.getThemes();
        if(orgThemes == null){
            orgThemes = new ArrayList<>();
        }
        orgThemes.add(theme);
        org.setThemes(orgThemes);
        theme.setOrganisation(org);

        return themeRepository.save(theme);
    }

    @Override
    public List<Theme> findThemes() {
        List<Theme> themes = themeRepository.findAll();
        return themes;
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

        Hibernate.initialize(theme.getOrganisation());
        Organisation org = organisationService.findOrganisationById(theme.getOrganisation().getId());
        List<Theme> orgThemes = org.getThemes();
        orgThemes.remove(theme);
        org.setThemes(orgThemes);
        theme.setOrganisation(org);

        themeRepository.delete(id);
    }

    @Override
    public List<Theme> findThemeByCreator(Integer userId) {
        User creator = userService.findUserById(userId);

        //loads the themes
        //to prevent org.hibernate.LazyInitializationException: failed to lazily initialize a collection of role
        //http://stackoverflow.com/questions/5027013/hibernate-lazy-load-application-design
        Hibernate.initialize(creator.getThemes());
        List<Theme> themes = creator.getThemes();
        themes.stream().forEach(t -> Hibernate.initialize(t.getCards()));
        return creator.getThemes();
    }

    @Override
    public List<Card> findThemeCards(Integer themeId) {
        Theme theme = findThemeById(themeId);

        Hibernate.initialize(theme.getCards());
        theme.getCards().stream().forEach(c -> Hibernate.initialize(c.getCardSessions()));
        return theme.getCards();
    }
}
