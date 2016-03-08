package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;

import java.util.List;

/**
 * Created by amy on 7/03/2016.
 */
public interface SessionService {
    Session findSessionById(Integer sessionId, Integer userId) throws SessionServiceException;

    List<Session> findSessionsCurrentUser(Integer userId) throws SessionServiceException;
}
