package be.kdg.kandoe.backend.services.api;


import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;

public interface UserService {

    User findUserById(Integer userId) throws UserServiceException;

    User findUserByUsername(String userName) throws UserServiceException;

    void checkLogin(Integer userId, String password) throws UserServiceException;


}
