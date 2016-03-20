package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;
import be.kdg.kandoe.backend.services.exceptions.ThemeServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.apache.log4j.Logger;
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

    private final Logger logger = Logger.getLogger(CardServiceImpl.class);
    private final ThemeRepository themeRepository;
    private final UserService userService;
    private final OrganisationService organisationService;

    @Autowired
    public ThemeServiceImpl(ThemeRepository themeRepository, UserService userService, OrganisationService organisationService) {
        this.themeRepository = themeRepository;
        this.userService = userService;
        this.organisationService = organisationService;
    }

    @Override
    public Theme findThemeById(Integer id) throws ThemeServiceException{
        logger.info(this.getClass().toString() + ": finding theme by id " + id);

        if(id == null){
            logger.warn(this.getClass().toString() + ": cannot find theme when id is null");
            throw new ThemeServiceException("Cannot find theme when id is null");
        }

        Theme theme = themeRepository.findOne(id);

        if(theme == null) {
            logger.warn(this.getClass().toString() + ": No theme found by id " + id);
            throw new ThemeServiceException("No theme found by id " + id);
        }

        if (theme.getCards() != null)
            Hibernate.initialize(theme.getCards());

        if (theme.getSubThemes() != null)
            Hibernate.initialize(theme.getSubThemes());

        logger.info(this.getClass().toString() + ": found theme with id " + id);
        return theme;
    }

    @Override
    public List<Theme> findThemesByCreator(Integer userId) throws ThemeServiceException {
        logger.info(this.getClass().toString() + ": finding themes by creator with userId " + userId);
        User creator = null;
        try {
            creator = userService.findUserById(userId);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot find the creator of the themes with userId " + userId);
            throw new ThemeServiceException("Cannot find the creator of the themes with userId" + userId);
        }

        //loads the themes
        //to prevent org.hibernate.LazyInitializationException: failed to lazily initialize a collection of role
        //http://stackoverflow.com/questions/5027013/hibernate-lazy-load-application-design
        Hibernate.initialize(creator.getThemes());
        List<Theme> themes = creator.getThemes();
        themes.stream().forEach(t -> {
            Hibernate.initialize(t.getCards());
            if (t.getSubThemes() != null)
                Hibernate.initialize(t.getSubThemes());
        });

        logger.info(this.getClass().toString() + ": found themes by creator with userId " + userId);
        return creator.getThemes();
    }

    @Override
    public Theme saveTheme(Theme theme, Integer userId, Integer orgId) throws ThemeServiceException {
        logger.info(this.getClass().toString() + ": creating theme");
        if(theme.getDescription() == null || theme.getThemeName() == null){
            logger.warn(this.getClass().toString() + ": cannot create a theme without description or name");
            throw new ThemeServiceException("Cannot create a theme without description or name");
        }

        User creator = null;
        try {
            creator = userService.findUserById(userId);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot create theme with userId " + userId);
            throw new ThemeServiceException("Cannot create theme with userId " + userId);
        }
        theme.setCreator(creator);

        List<Theme> themes = creator.getThemes();
        if (themes == null) {
            themes = new ArrayList<>();
        }
        themes.add(theme);
        creator.setThemes(themes);

        Organisation org = null;
        try {
            org = organisationService.findOrganisationById(orgId);
        } catch (OrganisationServiceException e) {
            logger.warn(this.getClass().toString() + ": failed to create theme because organisation cannot be found", e);
            throw  new ThemeServiceException("Failed to create theme because organisation cannot be found", e);
        }
        List<Theme> orgThemes = org.getThemes();
        if (orgThemes == null) {
            orgThemes = new ArrayList<>();
        }
        orgThemes.add(theme);
        org.setThemes(orgThemes);
        theme.setOrganisation(org);

        Theme t = themeRepository.save(theme);
        logger.info(this.getClass().toString() + ": created theme");
        return t;
    }

    @Override
    public Theme updateTheme(Theme theme) throws ThemeServiceException {
        logger.info(this.getClass().toString() + ": updating theme with id " + theme.getId());

        if(theme.getId() == null){
            logger.warn(this.getClass().toString() + ": cannot update theme without an id");
            throw new ThemeServiceException("Cannot update theme without an id");
        }

        Theme t = themeRepository.save(theme);

        logger.info(this.getClass().toString() + ": updated theme with id " + theme.getId());
        return t;
    }

    @Override
    public List<Card> findThemesCards(Integer themeId) throws ThemeServiceException {
        logger.info(this.getClass().toString() + ": finding cards of theme with id " + themeId);
        Theme theme = null;
        try {
            theme = findThemeById(themeId);
        } catch (ThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot find the cards of theme with id " + themeId);
            throw e;
        }

        Hibernate.initialize(theme.getCards());
        theme.getCards().stream().forEach(c -> Hibernate.initialize(c.getCardSessions()));

        logger.info(this.getClass().toString() + ": found cards of theme with id " + themeId);
        return new ArrayList<>(theme.getCards());
    }

    @Override
    public List<SubTheme> findThemeSubThemes(Integer themeId) throws ThemeServiceException {
        logger.info(this.getClass().toString() + ": finding subthemes of theme with id " + themeId);
        Theme theme = null;
        try {
            theme = findThemeById(themeId);
        } catch (ThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot find subthemes of theme with id " + themeId);
            throw e;
        }

        Hibernate.initialize(theme.getSubThemes());
        logger.info(this.getClass().toString() + ": found subthemes of theme with id " + themeId);
        return new ArrayList<>(theme.getSubThemes());
    }


}
