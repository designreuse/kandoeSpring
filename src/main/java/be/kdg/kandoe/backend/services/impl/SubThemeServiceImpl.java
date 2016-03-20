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
import be.kdg.kandoe.backend.services.exceptions.SubThemeServiceException;
import be.kdg.kandoe.backend.services.exceptions.ThemeServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(rollbackFor = SubThemeServiceException.class)
public class SubThemeServiceImpl implements SubThemeService {
    private final Logger logger = Logger.getLogger(SubThemeServiceImpl.class);
    private final SubThemeRepository subThemeRepository;
    private final ThemeService themeService;
    private final UserService userService;

    @Autowired
    public SubThemeServiceImpl(SubThemeRepository subThemeRepository, ThemeService themeService, UserService userService) {
        this.subThemeRepository = subThemeRepository;
        this.themeService = themeService;
        this.userService = userService;
    }

    @Override
    public SubTheme findSubThemeById(int id) throws SubThemeServiceException {
        logger.info(this.getClass().toString() + ": finding subtheme " + id);

        SubTheme st = subThemeRepository.findOne(id);

        if(st == null){
            logger.warn(this.getClass().toString() + ": cannot find subtheme " + id);
            throw new SubThemeServiceException("Cannot find subtheme " + id);
        }

        return st;
    }

    @Override
    public Set<SubTheme> findSubThemesByCreator(Integer userId) throws SubThemeServiceException {
        logger.info(this.getClass().toString() + ": finding subthemes by creator with id " + userId);
        User creator = null;
        try {
            creator = userService.findUserById(userId);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + "failed to find subtheme by creator", e);
            throw new SubThemeServiceException("Failed to find subtheme by creator", e);
        }

        Hibernate.initialize(creator.getSubThemes());
        Set<SubTheme> subThemes = creator.getSubThemes();
        subThemes.stream().forEach(t -> {
            Hibernate.initialize(t.getCards());
        });

        logger.info(this.getClass().toString() + ": found subthmes by creator with id " + userId);
        return creator.getSubThemes();
    }

    @Override
    public SubTheme saveSubTheme(SubTheme subTheme, Integer userId, Integer themeId) throws SubThemeServiceException {
        logger.info(this.getClass().toString() + ": saving subtheme");
        User creator = null;
        Theme theme = null;

        if(subTheme.getDescription() == null || subTheme.getSubThemeName() == null){
            logger.warn(this.getClass().toString() + ": failed to save subtheme because description and name are required");
            throw new SubThemeServiceException("Failed to save subtheme because description and name are required");
        }

        try {
            creator = userService.findUserById(userId);
            theme = themeService.findThemeById(themeId);
        } catch (ThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot save subtheme of theme with id " + themeId);
            throw new SubThemeServiceException("Cannot save subtheme of theme with id " + themeId, e);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot save subtheme with creator with id " + userId);
            throw new SubThemeServiceException("Cannot save subtheme with creator with id " + userId, e);
        }

        subTheme.setCreator(creator);
        subTheme.setTheme(theme);
        subTheme.setOrganisation(theme.getOrganisation());

        Set<SubTheme> subThemes = creator.getSubThemes();
        if (subThemes == null) {
            subThemes = new HashSet<>();
        }
        subThemes.add(subTheme);
        creator.setSubThemes(subThemes);

        Set<SubTheme> themeSubThemes = theme.getSubThemes();
        if (themeSubThemes == null)
            themeSubThemes = new HashSet<>();
        themeSubThemes.add(subTheme);
        theme.setSubThemes(themeSubThemes);

        SubTheme st = subThemeRepository.save(subTheme);

        logger.info(this.getClass().toString() + ": saved new subtheme " + st.getId());
        return st;
    }

    @Override
    public SubTheme updateSubTheme(SubTheme subTheme) throws SubThemeServiceException {
        logger.info(this.getClass().toString() + ": updating subtheme " + subTheme.getId());

        if(subTheme.getId() == null){
            logger.warn(this.getClass().toString() + ": cannot update subtheme with id null");
            throw new SubThemeServiceException("Cannot update subtheme with id null");
        }

        SubTheme st = subThemeRepository.save(subTheme);

        logger.info(this.getClass().toString() + ": updated subtheme " + subTheme.getId());
        return st;
    }

    @Override
    public Set<Card> findSubThemeCards(Integer subThemeId) throws SubThemeServiceException {
        logger.info(this.getClass().toString() + ": finding cards of subtheme " + subThemeId);
        SubTheme subTheme = null;
        try {
            subTheme = findSubThemeById(subThemeId);
        } catch (SubThemeServiceException e) {
            logger.warn(this.getClass().toString() + ": failed to find cards of subtheme " + subThemeId);
            throw e;
        }

        Hibernate.initialize(subTheme.getCards());
        Set<Card> cards = subTheme.getCards();
        cards.stream().forEach(c -> Hibernate.initialize(c.getCardSessions()));

        logger.info(this.getClass().toString() + ": found cards of subtheme " + subThemeId);
        return subTheme.getCards();
    }
}
