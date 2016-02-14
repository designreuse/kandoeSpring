package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;

import java.util.List;

/**
 * Created by amy on 12/02/2016.
 */
public interface UserRepositoryCustom {

    List<User> findUsersByRole(Class c);

    Integer addUser(User user) throws UserServiceException;
}
