package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionState;
import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.backend.dom.game.Message;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.CardSessionRepository;
import be.kdg.kandoe.backend.persistence.api.SessionRepository;
import be.kdg.kandoe.backend.services.api.*;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by amy on 7/03/2016.
 */

@Service
@Transactional
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final UserService userService;
    private final ThemeService themeService;
    private final SubThemeService subThemeService;
    private final CardSessionRepository cardSessionRepository;
    private final CardService cardService;
    private final MailService mailService;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, UserService userService, ThemeService themeService,
                              SubThemeService subThemeService, CardSessionRepository cardSessionRepository, CardService cardService, MailService mailService) {
        this.sessionRepository = sessionRepository;
        this.userService = userService;
        this.themeService = themeService;
        this.subThemeService = subThemeService;
        this.cardSessionRepository = cardSessionRepository;
        this.cardService = cardService;
        this.mailService = mailService;
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
            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getTheme() != null &&
                    u.getSession().getTheme().getThemeId().equals(themeId))) {

                List<Session> s = userSessions.stream().
                        filter(userSession -> userSession.getSession().getTheme() != null&& userSession.getSession().getTheme().getThemeId().equals(themeId))
                        .map(UserSession::getSession).collect(Collectors.toList());

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
    public List<Session> findSessionBySubThemeId(Integer subThemeId, Integer userId) throws SessionServiceException {
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> subThemeSessions = new ArrayList<>();
            Hibernate.initialize(userSessions);

            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getSubTheme() != null &&
                    u.getSession().getSubTheme().getSubThemeId().equals(subThemeId))){

                List<Session> s = userSessions.stream().
                        filter(userSession -> userSession.getSession().getSubTheme() != null&& userSession.getSession().getSubTheme().getSubThemeId().equals(subThemeId))
                        .map(UserSession::getSession).collect(Collectors.toList());

                for (Session session : s){
                    Hibernate.initialize(session.getCardSessions());
                    Hibernate.initialize(session.getSubTheme());
                    subThemeSessions.add(session);
                }
                return subThemeSessions;
            }
        } catch (UserServiceException e){
            throw new SessionServiceException(e.getMessage(), e);
        }

        throw new SessionServiceException("You're not a member of this session");
    }

    @Override
    public Session createSession(Session session, Integer themeId, Integer subThemeId,Integer userId) throws SessionServiceException {
        Organisation org;
        if (themeId != 0){
            Theme theme = themeService.findThemeById(themeId);
            if (theme == null)
                throw new SessionServiceException("Theme does not exist");

            if (!theme.getCreator().getId().equals(userId))
                throw new SessionServiceException("You are not the creator of this theme");

            session.setTheme(theme);
            org = theme.getOrganisation();
        } else {
            SubTheme subTheme = subThemeService.findSubThemeById(subThemeId);
            if (subTheme == null)
                throw new SessionServiceException("Theme does not exist");

            if (!subTheme.getCreator().getId().equals(userId))
                throw new SessionServiceException("You are not the creator of this theme");

            session.setSubTheme(subTheme);
            org = subTheme.getOrganisation();
        }


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

        session.setState(SessionState.CREATED);
        session = sessionRepository.save(session);

        for (UserSession userSession : userSessions) {
            userSession.setSession(session);

            //todo send mail
           /* mailService.sendMailToUserByUserId(userSession.getUser().getId(), "Kandoe - Invitation for session",
                    "A new kandoe has been created for an organisation you're member of");    */
        }

        return session;
    }

    @Override
    public Session addCardsToSession(Integer sessionId, List<Card> cards, Integer userId) throws SessionServiceException {
        Session session = findSessionById(sessionId, userId);
        if(session.getState() == SessionState.CREATED){
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
        return session;
    }

    @Override
    public void updateCardPosition(Integer cardId, Integer userId, Integer sessionId) throws SessionServiceException {
        Session session = findSessionById(sessionId, userId);

        //todo state
        //if(session.getState() == SessionState.IN_PROGRESS){
            CardSession cardSession = session.getCardSessions().stream().filter(s -> s.getCard().getId().equals(cardId)).findFirst().get();
            UserSession userSession = session.getUserSessions().stream().filter(s -> s.getUserPosition() == 0).findFirst().get();

            if (userSession.getUser().getId().equals(userId)) {
                cardSession.setPosition(cardSession.getPosition()+1);
                for (UserSession u : session.getUserSessions()) {
                    if (u.getUserPosition() == 0) {
                        u.setUserPosition(session.getUserSessions().size()-1);
                    } else {
                        u.setUserPosition(u.getUserPosition() - 1);
                    }
                }
            }
            sessionRepository.save(session);
       // }
    }

    @Override
    public Session addMessageToChat(Integer sessionId, String message, Integer userId) throws SessionServiceException {
        Session s = findSessionById(sessionId, userId);

        if(s != null){
            try {
                Message m = new Message();
                m.setContent(message);
                m.setSender(userService.findUserById(userId));

                List<Message> chat = s.getChat();
                if(chat == null)
                    chat = new ArrayList<>();

                chat.add(m);
                s.setChat(chat);
                s = sessionRepository.save(s);
                return s;
            } catch (UserServiceException e){
                throw new SessionServiceException(e.getMessage(), e);
            }
        }
        throw new SessionServiceException("Session not found");
    }

    @Override
    public Session startSession(Integer sessionId, Integer userId) throws SessionServiceException {
        Session s = findSessionById(sessionId, userId);

        if(s.getState() == SessionState.CREATED){
            s.setState(SessionState.IN_PROGRESS);
            s = sessionRepository.save(s);
        }

        return s;
    }

    @Override
    public Session stopSession(Integer sessionId, Integer userId) throws SessionServiceException {
        Session s = findSessionById(sessionId, userId);

        if(s.getState() == SessionState.IN_PROGRESS && s.getTheme().getCreator().getId().equals(userId)){
            s.setState(SessionState.FINISHED);
            s = sessionRepository.save(s);
        }

        return s;
    }
}
