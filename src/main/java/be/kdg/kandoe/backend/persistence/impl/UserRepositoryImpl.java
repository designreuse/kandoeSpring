package be.kdg.kandoe.backend.persistence.impl;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepositoryCustom;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by amy on 12/02/2016.
 */

@Repository("userRepository")
public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> findUsersByRole(Class c) {
        return null;
    }

    @Override
    public Integer addUser(User user) throws UserServiceException {
        return null;
    }
}
