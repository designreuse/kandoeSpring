package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.Message;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import org.hibernate.SessionException;

import java.time.LocalDateTime;
import java.util.List;

/**
 * API to find, create and update sessions
 */
public interface SessionService {

    /**
     * Finds the session by the given id, only if the user is a participant of the session.
     * Initializes the userSessions, cardSessions, theme
     * @param sessionId the id of the session to find
     * @param userId the id of the user taking the action
     * @return the session
     * @throws SessionServiceException when the user cannot be found or when the user is not a member of the session
     */
    Session findSessionById(Integer sessionId, Integer userId) throws SessionServiceException;

    /**
     * Finds the sessions that the user is a member of.
     * Initializes theme and cardSessions
     * @param userId the id of the user
     * @return a list of sessions
     * @throws SessionServiceException
     */
    List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException;

    /**
     * Finds the sessions of a theme
     * Initializes theme and cardsessions
     * @param themeId the id of the theme
     * @param userId the id of the user taking the action
     * @return a list of sessions
     * @throws SessionServiceException
     */
    List<Session> findSessionsByThemeId(Integer themeId, Integer userId) throws SessionServiceException;

    /**
     * Finds the sessions of a subtheme
     * Initializes subtheme and cardsessions
     * @param subThemeId the id of the subtheme
     * @param userid the id of the user taking the action
     * @return a list of sessions
     * @throws SessionServiceException
     */
    List<Session> findSessionsBySubThemeId(Integer subThemeId, Integer userid) throws SessionServiceException;

    /**
     * Creates a new session for a theme or subtheme.
     * @param session the session to create
     * @param themeId the id of the theme. If you want to make the session for a subtheme, put 0.
     * @param subthemeId the id of the subtheme. If you want to make the session for a theme, put 0.
     * @param userId the id of the user taking the action
     * @return the new session
     * @throws SessionServiceException
     */
    Session createSession(Session session, Integer themeId,Integer subthemeId ,Integer userId) throws SessionServiceException;

    /**
     * Add cards to a session with cardIds. Only possible if the sessionState is CREATED.
     * If all users have chosen cards the session will be IN_PROGRESS.
     * @param sessionId the id of the session to add cards to.
     * @param cardIds a list of cardIds
     * @param userId the id of the user taking the action
     * @return the session
     * @throws SessionServiceException
     */
	Session addCardIdsToSession(Integer sessionId, List<Integer> cardIds, Integer userId) throws SessionServiceException;

    /**
     * Add cards to a session with Card objects. Only possible if the sessionState is CREATED.
     * If all users have chosen cards the session will be IN_PROGRESS.
     * @param sessionId the id of the session to add cards to.
     * @param cards a list of cards
     * @param userId the id of the user taking the action
     * @return the session
     * @throws SessionServiceException
     */
    Session addCardsToSession(Integer sessionId, List<Card> cards, Integer userId) throws SessionServiceException;

    /**
     * Updates the position of the card. Only possible if the sessionState is IN_PROGRESS.
     * If the card has reached the middle of the circle, the sessionState is FINISHED.
     * Decreases the position of every user with one.
     * @param cardId the id of the card to move
     * @param userId the id of the user taking the action
     * @param sessionId the id of the session
     * @throws SessionServiceException
     */
    void updateCardPosition(Integer cardId,Integer userId, Integer sessionId) throws SessionServiceException;

    /**
     * Adds a message to the chat of a session.
     * @param sessionId the id of the session
     * @param message the message to add
     * @param userId the id of the user taking the actino
     * @param date the date of the message
     * @return the session
     * @throws SessionServiceException
     */
    Session addMessageToChat(Integer sessionId, String message, Integer userId, LocalDateTime date) throws SessionServiceException;

    /**
     * Retrieves the chat history of a session.
     * @param sessionId the id of the session
     * @param userId the id of the user taking the action.
     * @return a list of messages
     * @throws SessionServiceException
     */
    List<Message> getChatHistory(Integer sessionId, Integer userId) throws SessionServiceException;

    /**
     * Sets the sessionState to IN_PROGRESS if it is CREATED
     * @param sessionId the id of the session
     * @param userId the id of the user taking the action. The user has to be an organiser of the organisation
     * @return the session
     * @throws SessionServiceException
     */
    Session startSession(Integer sessionId, Integer userId) throws SessionServiceException;

    /**
     * Sets the sessionState to FINISHED if it is IN_PROGRESS
     * @param sessionId the id of the session
     * @param userId the id of the user taking the action. The user has to be an organiser of the organisation
     * @return the session
     * @throws SessionServiceException
     */
    Session stopSession(Integer sessionId, Integer userId) throws SessionServiceException;

    /**
     * Checks whether the user can move a card.
     * @param sessionId the id of the session
     * @param userId the user to check for
     * @return boolean whether user can move
     */
    boolean checkCanPlay(Integer sessionId, Integer userId);
}
