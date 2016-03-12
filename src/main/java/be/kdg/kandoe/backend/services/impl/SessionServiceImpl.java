package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.CardSessionRepository;
import be.kdg.kandoe.backend.persistence.api.SessionRepository;
import be.kdg.kandoe.backend.services.api.*;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.hibernate.Hibernate;
import org.hibernate.SessionException;
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
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final UserService userService;
    private final ThemeService themeService;
    private final CardSessionRepository cardSessionRepository;
    private final CardService cardService;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, UserService userService, ThemeService themeService,
                              CardSessionRepository cardSessionRepository, CardService cardService) {
        this.sessionRepository = sessionRepository;
        this.userService = userService;
        this.themeService = themeService;
        this.cardSessionRepository = cardSessionRepository;
        this.cardService = cardService;
    }

    @Override
    public Session findSessionById(Integer sessionId, Integer userId) throws SessionServiceException {
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            Hibernate.initialize(userSessions);
            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getId().equals(sessionId))) {
                Session s = sessionRepository.findOne(sessionId);
                Hibernate.initialize(s.getCardSessions());
                Hibernate.initialize(s.getTheme());
                return s;
            }
        } catch (UserServiceException e) {
            throw new SessionServiceException(e.getMessage(), e);
        }
        throw new SessionServiceException("You're not a member of this session");
    }

    @Override
    public List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException {
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> sessions = new ArrayList<>();
            for (UserSession userSession : userSessions) {
                sessions.add(userSession.getSession());
                Hibernate.initialize(userSession.getSession().getTheme());
                Hibernate.initialize(userSession.getSession().getCardSessions());
            }
            return sessions;
        } catch (UserServiceException ex) {
            throw new SessionServiceException(ex.getMessage());
        }
    }

    @Override
    public List<Session> findSessionByThemeId(Integer themeId, Integer userId) throws SessionServiceException {
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> themeSessions = new ArrayList<>();
            Hibernate.initialize(userSessions);
            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getTheme().getThemeId().equals(themeId))) {
                List<Session> s = sessionRepository.findAll();
                for (Session session : s) {
                    Hibernate.initialize(session.getCardSessions());
                    Hibernate.initialize(session.getTheme());
                    themeSessions.add(session);
                }

                return themeSessions;
            }
        } catch (UserServiceException e) {
            throw new SessionServiceException(e.getMessage(), e);
        }
        throw new SessionServiceException("You're not a member of this session");
    }

    @Override
    public Session createSession(Session session, Integer themeId, Integer userId) throws SessionServiceException {
        Theme theme = themeService.findThemeById(themeId);

        if (theme == null)
            throw new SessionServiceException("Theme does not exist");

        if (!theme.getCreator().getId().equals(userId))
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
            if (us == null)
                us = new ArrayList<>();
            us.add(userSession);
            user.setUserSessions(us);
        }
        session.setUserSessions(userSessions);

        session = sessionRepository.save(session);

        for (UserSession userSession : userSessions) {
            userSession.setSession(session);
        }

        return session;
    }

    @Override
    public Session addCardsToSession(Integer sessionId, List<Card> cards, Integer userId) throws SessionServiceException {
        Session session = findSessionById(sessionId, userId);
        Theme theme = session.getTheme();

        List<CardSession> cardSessions = session.getCardSessions();
        if (cardSessions == null)
            cardSessions = new ArrayList<>();

        for (Card card : cards) {
            if (!cardSessions.stream().anyMatch(cs -> cs.getCard().getCardId().equals(card.getId()))) {
                if (theme.getCards().stream().anyMatch(c -> c.getCardId().equals(card.getId()))) {
                    CardSession cardSession = new CardSession();
                    cardSession.setCard(cardService.findCardById(card.getId()));
                    cardSession.setPosition(0);
                    cardSessionRepository.save(cardSession);
                    cardSessions.add(cardSession);

                    List<CardSession> cs = card.getCardSessions();
                    if (cs == null)
                        cs = new ArrayList<>();
                    cs.add(cardSession);
                    card.setCardSessions(cs);
                }
            }
        }
        session.setCardSessions(cardSessions);


        UserSession userSession = session.getUserSessions().stream().filter(us -> us.getUser().getId().equals(userId))
                .findFirst().get();
        userSession.setChosenCards(true);

        session = sessionRepository.save(session);
        for (CardSession cardSession : cardSessions) {
            cardSession.setSession(session);
        }
        return session;
    }

    @Override
    public void updateCardPosition(Integer cardId, int currentPosition, Integer userId, Integer sessionId) throws SessionServiceException {
        Session session = findSessionById(sessionId, userId);
        CardSession cardSession = session.getCardSessions().stream().filter(s -> s.getCard().getId().equals(cardId)).findFirst().get();
        UserSession userSession = session.getUserSessions().stream().filter(s -> s.getUserPosition() == 0).findFirst().get();
        if (userSession.getUser().getId().equals(userId)) {
            cardSession.setPosition(currentPosition+1);
            for (UserSession u : session.getUserSessions()) {
                if (u.getUserPosition() == 0) {
                    u.setUserPosition(session.getUserSessions().size()-1);
                } else {
                    u.setUserPosition(u.getUserPosition() - 1);
                }
            }
        }
        sessionRepository.save(session);
    }
}
