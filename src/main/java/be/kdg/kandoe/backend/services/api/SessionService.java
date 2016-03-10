package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;

import java.util.List;

/**
 * Created by amy on 7/03/2016.
 */
public interface SessionService {

    /**
     * Find the session by the given id, only if the user is a participant of the session.
     * Initializes the userSessions, cardSessions, theme
     * @param sessionId
     * @param userId
     * @return the session
     * @throws SessionServiceException when the user cannot be found or when the user is not a member of the session
     */
    Session findSessionById(Integer sessionId, Integer userId) throws SessionServiceException;

    List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException;

    Session createSession(Session session, Integer themeId, Integer userId) throws SessionServiceException;

    Session addCardsToSession(Integer sessionId, List<Card> cards, Integer userId) throws SessionServiceException;
}
