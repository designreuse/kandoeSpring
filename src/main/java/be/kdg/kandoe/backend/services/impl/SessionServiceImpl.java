package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.SessionRepository;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by amy on 7/03/2016.
 */

@Service
@Transactional
public class SessionServiceImpl implements SessionService{

    private final SessionRepository sessionRepository;
    private final UserService userService;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, UserService userService) {
        this.sessionRepository = sessionRepository;
        this.userService = userService;
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
}
