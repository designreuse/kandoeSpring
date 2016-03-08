package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.SessionRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by amy on 7/03/2016.
 */

@Service
@Transactional
public class SessionServiceImpl implements SessionService{

    private final SessionRepository sessionRepository;
    private final UserService userService;
    private final ThemeService themeService;
    private final OrganisationService organisationService;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, UserService userService, ThemeService themeService,
                              OrganisationService organisationService) {
        this.sessionRepository = sessionRepository;
        this.userService = userService;
        this.themeService = themeService;
        this.organisationService = organisationService;
    }

    @Override
    public Session findSessionById(Integer sessionId, Integer userId) throws SessionServiceException {
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            Hibernate.initialize(userSessions);
            if(userSessions!= null && userSessions.stream().anyMatch(u -> u.getSession().getId().equals(sessionId))){
                Session s = sessionRepository.findOne(sessionId);
                Hibernate.initialize(s.getCardSessions());
                return s;
            }
        } catch (UserServiceException e) {
            throw new SessionServiceException(e.getMessage(), e);
        }
        throw new SessionServiceException("You're not a member of this session");
    }

    @Override
    public List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException{
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> sessions = new ArrayList<>();
            for (UserSession userSession : userSessions) {
                sessions.add(userSession.getSession());
            }
            return sessions;
        } catch(UserServiceException ex){
            throw new SessionServiceException(ex.getMessage());
        }
    }

    @Override
    public Session createSession(Session session, Integer themeId, Integer userId) throws SessionServiceException {
        Theme theme = themeService.findThemeById(themeId);

        if(theme == null)
            throw new SessionServiceException("Theme does not exist");

        if(!theme.getCreator().getId().equals(userId))
            throw new SessionServiceException("You are not the creator of this theme");

        session.setTheme(theme);
        Organisation org = theme.getOrganisation();
        Set<User> users = org.getUsers();
        users.addAll(org.getOrganisers());

        int i = 0;
        List<UserSession> userSessions = new ArrayList<>();
        for (User user : users) {
            UserSession userSession = new UserSession();
            userSession.setUser(user);
            userSession.setUserPosition(i++);
            userSessions.add(userSession);
            List<UserSession> us = user.getUserSessions();
            if(us == null)
                us = new ArrayList<>();
            us.add(userSession);
            user.setUserSessions(us);
        }
        session.setUserSessions(userSessions);

        List<CardSession> cardSessions = new ArrayList<>();
        for (Card card : theme.getCards()) {
            CardSession cardSession = new CardSession();
            cardSession.setCard(card);
            cardSession.setPosition(0);
            cardSessions.add(cardSession);
            List<CardSession> cs = card.getCardSessions();
            if(cs == null)
                cs = new ArrayList<>();
            cs.add(cardSession);
            card.setCardSessions(cs);
        }
        session.setCardSessions(cardSessions);

        session = sessionRepository.save(session);
        for (CardSession cardSession : cardSessions) {
            cardSession.setSession(session);
        }
        for (UserSession userSession : userSessions) {
            userSession.setSession(session);
        }

        return session;
    }
}
