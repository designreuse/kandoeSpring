package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import org.hibernate.SessionException;

import java.util.List;

/**
 * Created by amy on 7/03/2016.
 */
public interface SessionService {

    /**
     * Finds the session by the given id, only if the user is a participant of the session.
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

    List<Session> findSessionByThemeId(Integer themeId, Integer userId) throws SessionServiceException;

    void updateCardPosition(Integer cardId, int newPostion,Integer userId, Integer sessionId) throws SessionServiceException;

    Session addMessageToChat(Integer sessionId, String message, Integer userId) throws SessionServiceException;

    /**
     * Sets the sessionState to IN_PROGRESS if it is CREATED
     * @param sessionId
     * @param userId
     * @return
     * @throws SessionServiceException
     */
    Session startSession(Integer sessionId, Integer userId) throws SessionServiceException;

    /**
     * Sets the sessionState to FINISHED if it is IN_PROGRESS
     * @param sessionId
     * @param userId
     * @return
     * @throws SessionServiceException
     */
    Session stopSession(Integer sessionId, Integer userId) throws SessionServiceException;
}
