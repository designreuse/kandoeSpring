package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.SubThemeRepository;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.SubThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.hibernate.Hibernate;
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

/*    @Override
    public List<SubTheme> findSubThemeByCreator(Integer userId) {
        User creator = userService.findUserById(userId);

        Hibernate.initialize(creator.getSubThemes());
        List<SubTheme> subThemes = creator.getSubThemes();
        subThemes.stream().forEach(t -> {
            Hibernate.initialize(t.getCards());
            if(t.getSubThemes() != null)
                Hibernate.initialize(t.getSubThemes());
        });
        return creator.getSubThemes();
    }*/

    @Override
    public List<Card> findSubThemeCards(Integer themeId) {
        SubTheme subTheme = findSubThemeById(themeId);

        Hibernate.initialize(subTheme.getCards());
        subTheme.getCards().stream().forEach(c -> Hibernate.initialize(c.getCardSessions()));
        return subTheme.getCards();
    }
}
