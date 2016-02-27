package be.kdg.kandoe.backend.services.api;


import be.kdg.kandoe.backend.dom.other.Organisation;
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

    /**
     * Finds the organisations the user is part of or is organiser of
     * @param user the user to find the organisations for
     * @return a list of organisations
     */
    List<Organisation> findOrganisations(User user);

    User updateUser(User user) throws UserServiceException;

    /**
     * Changes password off user if oldPassword matches existing password
     * @param oldPassword the current password
     * @param newPassword the new password
     * @param userId
     * @throws UserServiceException thrown when the passwords don't match
     */
    void changePassword(String oldPassword, String newPassword, Integer userId) throws UserServiceException;
}
