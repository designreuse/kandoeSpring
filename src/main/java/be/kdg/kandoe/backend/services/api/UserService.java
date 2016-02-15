package be.kdg.kandoe.backend.services.api;


import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService  extends UserDetailsService {

    User findUserById(Integer userId) throws UserServiceException;

    User findUserByUsername(String username) throws UserServiceException;

    List<User> findUsers();

    User saveUser(User user) throws UserServiceException;

    void checkLogin(Integer userId, String password) throws UserServiceException;


}
