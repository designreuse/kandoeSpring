package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.*;
import be.kdg.kandoe.backend.dom.game.Message;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.CardSessionRepository;
import be.kdg.kandoe.backend.persistence.api.SessionRepository;
import be.kdg.kandoe.backend.services.api.*;
import be.kdg.kandoe.backend.services.exceptions.*;
import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = {SessionServiceException.class})
public class SessionServiceImpl implements SessionService {

    private final Logger logger = Logger.getLogger(SessionServiceImpl.class);
    private final SessionRepository sessionRepository;
    private final UserService userService;
    private final ThemeService themeService;
    private final SubThemeService subThemeService;
    private final CardSessionRepository cardSessionRepository;
    private final CardService cardService;
    private final MailService mailService;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, UserService userService, ThemeService themeService,
                              SubThemeService subThemeService, CardSessionRepository cardSessionRepository,
                              CardService cardService, MailService mailService) {
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
        logger.info(this.getClass().toString() + ": finding a session with id " + sessionId);
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getId().equals(sessionId))) {
                Session s = sessionRepository.findOne(sessionId);
                Hibernate.initialize(s.getCardSessions());
                Hibernate.initialize(s.getTheme());

                logger.info(this.getClass().toString() + ": found session with id " + sessionId);
                return s;
            }
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": failed to find session because the user cannot be found", e);
            throw new SessionServiceException("Failed to find session because the user cannot be found", e);
        }
        logger.warn(this.getClass().toString() + ": failed to find session because the user is not a member");
        throw new SessionServiceException("You're not a member of this session");
    }

    @Override
    public List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": finding sessions of user with id " + userId);
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> sessions = new ArrayList<>();
            for (UserSession userSession : userSessions) {
                sessions.add(userSession.getSession());
                Hibernate.initialize(userSession.getSession().getTheme());
                Hibernate.initialize(userSession.getSession().getCardSessions());
            }
            logger.info(this.getClass().toString() + ": found sessions of user with id " + userId);
            return sessions;
        } catch (UserServiceException ex) {
            logger.warn(this.getClass().toString() + ": failed to find sessions because user cannot be found", ex);
            throw new SessionServiceException("Failed to find sessions because user cannot be found", ex);
        }
    }

    @Override
    public List<Session> findSessionsByThemeId(Integer themeId, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": finding sessions of theme with id " + themeId);
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> themeSessions = new ArrayList<>();
            Hibernate.initialize(userSessions);
            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getTheme() != null &&
                    u.getSession().getTheme().getThemeId().equals(themeId))) {

                List<Session> s = userSessions.stream().
                        filter(userSession -> userSession.getSession().getTheme() != null
                                && userSession.getSession().getTheme().getThemeId().equals(themeId))
                        .map(UserSession::getSession).collect(Collectors.toList());

                for (Session session : s) {
                    Hibernate.initialize(session.getCardSessions());
                    Hibernate.initialize(session.getTheme());
                    themeSessions.add(session);
                }
            }

            logger.info(this.getClass().toString() + ": found sessions of theme with id " + themeId);
            return themeSessions;
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": failed to find sessions because user cannot be found", e);
            throw new SessionServiceException("Failed to find sessions because user cannot be found", e);
        }
    }

    @Override
    public List<Session> findSessionsBySubThemeId(Integer subThemeId, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": finding sessions of subtheme with id " + subThemeId);
        try {
            User user = userService.findUserById(userId);
            List<UserSession> userSessions = user.getUserSessions();
            List<Session> subThemeSessions = new ArrayList<>();
            Hibernate.initialize(userSessions);

            if (userSessions != null && userSessions.stream().anyMatch(u -> u.getSession().getSubTheme() != null &&
                    u.getSession().getSubTheme().getSubThemeId().equals(subThemeId))){

                List<Session> s = userSessions.stream().
                        filter(userSession -> userSession.getSession().getSubTheme() != null
                                && userSession.getSession().getSubTheme().getSubThemeId().equals(subThemeId))
                        .map(UserSession::getSession).collect(Collectors.toList());

                for (Session session : s){
                    Hibernate.initialize(session.getCardSessions());
                    Hibernate.initialize(session.getSubTheme());
                    subThemeSessions.add(session);
                }
            }

            logger.info(this.getClass().toString() + ": found sessions of subtheme with id " + subThemeId);
            return subThemeSessions;
        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": failed to find sessions because user cannot be found", e);
            throw new SessionServiceException("Failed to find sessions because user cannot be found", e);
        }
    }

    @Override
    public Session createSession(Session session, Integer themeId, Integer subThemeId,Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": creating session");
        Organisation org;

        if(session.getSessionName() == null){
            logger.warn(this.getClass().toString() + ": failed to create session because name is null");
            throw new SessionServiceException("Failed to create session because name is null");
        }

        if (themeId != 0){
            Theme theme = null;
            try {
                theme = themeService.findThemeById(themeId);
            } catch (ThemeServiceException e) {
                logger.warn(this.getClass().toString() + ": failed to create session because the theme does not exist");
                throw new SessionServiceException("Theme does not exist");
            }

            if (!theme.getCreator().getId().equals(userId)){
                logger.warn(this.getClass().toString() + ": failed to create session because user is not the creator of the theme");
                throw new SessionServiceException("You are not the creator of this theme");
            }

            session.setTheme(theme);
            session.setSubTheme(null);
            org = theme.getOrganisation();
        } else {
            SubTheme subTheme = null;
            try {
                subTheme = subThemeService.findSubThemeById(subThemeId);
            } catch (SubThemeServiceException e) {
                logger.warn(this.getClass().toString() + ": failed to create session because the subtheme does not exist");
                throw new SessionServiceException("Subtheme does not exist");
            }

            if (!subTheme.getCreator().getId().equals(userId)) {
                logger.warn(this.getClass().toString() + ": failed to create session because user is not the creator of the subtheme");
                throw new SessionServiceException("You are not the creator of this subtheme");
            }
            session.setSubTheme(subTheme);
            session.setTheme(null);
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
        logger.info(this.getClass().toString() + ": created session");
        return session;
    }

    @Override
    public Session addCardIdsToSession(Integer sessionId, List<Integer> cardIds, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": adding cards to session with id " + sessionId);
        Session session = findSessionById(sessionId, userId);
        if(session.getState() == SessionState.CREATED){
            Theme theme = session.getTheme();

            List<CardSession> cardSessions = session.getCardSessions();
            if (cardSessions == null)
                cardSessions = new ArrayList<>();

            for (Integer cardId : cardIds) {
                if (!cardSessions.stream().anyMatch(cs -> cs.getCard().getCardId().equals(cardId))) {
                    if (theme.getCards().stream().anyMatch(c -> c.getCardId().equals(cardId))) {
                        logger.info(this.getClass().toString() + ": adding card to session with cardId " + cardId);
                        Card card = null;
                        try {
                            card = cardService.findCardById(cardId);
                        } catch (CardServiceException e) {
                            logger.warn(this.getClass().toString() + ": failed to add card to session", e);
                            throw new SessionServiceException("Failed to add card to session", e);
                        }
                        CardSession cardSession = new CardSession();
                        cardSession.setCard(card);
                        cardSession.setPosition(0);
                        cardSessionRepository.save(cardSession);
                        cardSessions.add(cardSession);

                        List<CardSession> cs = card.getCardSessions();
                        if (cs == null)
                            cs = new ArrayList<>();
                        cs.add(cardSession);
                        card.setCardSessions(cs);
                        logger.info(this.getClass().toString() + ": added card to session with cardId " + cardId);
                    }
                }
            }
            session.setCardSessions(cardSessions);

            UserSession userSession = session.getUserSessions().stream().filter(us -> us.getUser().getId().equals(userId))
                    .findFirst().get();
            userSession.setChosenCards(true);

            if(session.getUserSessions().stream().allMatch(UserSession::isChosenCards)){
                logger.info(this.getClass().toString() + ": session with id " + sessionId + " is now IN_PROGRESS");
                session.setState(SessionState.IN_PROGRESS);
            }

            session = sessionRepository.save(session);
            for (CardSession cardSession : cardSessions) {
                cardSession.setSession(session);
            }
        }
        logger.info(this.getClass().toString() + ": added cards to session");
        return session;
    }

    @Override
    public Session addCardsToSession(Integer sessionId, List<Card> cards, Integer userId) throws SessionServiceException {
        List<Integer> cardIds = cards.stream().map(Card::getCardId).collect(Collectors.toList());
        return this.addCardIdsToSession(sessionId, cardIds, userId);
    }

    @Override
    public void updateCardPosition(Integer cardId, Integer userId, Integer sessionId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": updating cardPosition with id " + cardId);
        Session session = findSessionById(sessionId, userId);

        if (session.getState() == SessionState.IN_PROGRESS) {
            CardSession cardSession = session.getCardSessions().stream().filter(s -> s.getCard().getId().equals(cardId)).findFirst().get();
            UserSession userSession = session.getUserSessions().stream().filter(s -> s.getUserPosition() == 0).findFirst().get();

            if (userSession.getUser().getId().equals(userId)) {
                cardSession.setPosition(cardSession.getPosition() + 1);
                logger.info(this.getClass().toString() + ": new cardPosition: " + cardSession.getPosition());
                for (UserSession u : session.getUserSessions()) {
                    if (u.getUserPosition() == 0) {
                        u.setUserPosition(session.getUserSessions().size() - 1);
                    } else {
                        u.setUserPosition(u.getUserPosition() - 1);
                    }
                }

                if(cardSession.getPosition() == session.getSize()-1){
                    session.setState(SessionState.FINISHED);
                }
            }
            sessionRepository.save(session);
            logger.info(this.getClass().toString() + ": updated cardPosition with id " + cardId);
        }
    }

    @Override
    public Session addMessageToChat(Integer sessionId, String message, Integer userId, LocalDateTime date) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": adding message to chat in session with id " + sessionId);
        Session s = findSessionById(sessionId, userId);

        if(s == null){
            logger.warn(this.getClass().toString() + ": failed to add message to chat because session was not found");
            throw new SessionServiceException("Session not found");
        }

        try {
            Message m = new Message();
            m.setContent(message);
            m.setSender(userService.findUserById(userId));
            m.setDate(date);

            List<Message> chat = s.getChat();
            if(chat == null)
                chat = new ArrayList<>();

            chat.add(m);
            s.setChat(chat);
            s = sessionRepository.save(s);

            logger.info(this.getClass().toString() + ": added message to chat in session with id " + sessionId);
            return s;
        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": failed to add message to chat because user was not found", e);
            throw new SessionServiceException("Failed to add message to chat because user was not found", e);
        }
    }

    @Override
    public List<Message> getChatHistory(Integer sessionId, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": finding the chat history of session " + sessionId);
        Session s = findSessionById(sessionId, userId);
        Hibernate.initialize(s.getChat());

        logger.info(this.getClass().toString() + ": found the chat history of session " + sessionId);
        return s.getChat();
    }

    @Override
    public Session startSession(Integer sessionId, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": starting session " + sessionId);
        Session s = findSessionById(sessionId, userId);

        if(s.getState() == SessionState.CREATED && s.getTheme().getOrganisation().
                getOrganisers().stream().anyMatch(o -> o.getId().equals(userId))){
            s.setState(SessionState.IN_PROGRESS);
            s = sessionRepository.save(s);
            logger.info(this.getClass().toString() + ": started session " + sessionId);
        }

        return s;
    }

    @Override
    public Session stopSession(Integer sessionId, Integer userId) throws SessionServiceException {
        logger.info(this.getClass().toString() + ": stopping session " + sessionId);
        Session s = findSessionById(sessionId, userId);

        if(s.getState() == SessionState.IN_PROGRESS && s.getTheme().getOrganisation().
                getOrganisers().stream().anyMatch(o -> o.getId().equals(userId))){
            s.setState(SessionState.FINISHED);
            s = sessionRepository.save(s);
            logger.info(this.getClass().toString() + ": stopped session " + sessionId);
        }

        return s;
    }

    @Override
    public boolean checkCanPlay(Integer sessionId, Integer userId){
        Session s = sessionRepository.findOne(sessionId);

        if(s != null){
            if(s.getUserSessions().stream().filter(u -> u.getUser().getId().equals(userId))
                    .findFirst().get().getUserPosition() == 0){
                return true;
            }
        }
        return false;
    }
}
