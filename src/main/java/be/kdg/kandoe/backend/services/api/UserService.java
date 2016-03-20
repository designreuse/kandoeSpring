package be.kdg.kandoe.backend.services.api;


import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * API to find, create and update users
 */
public interface UserService  extends UserDetailsService {

    /**
     * Finds a user by userId
     * @param userId the id of the user
     * @return the user
     * @throws UserServiceException when the user cannot be found
     */
    User findUserById(Integer userId) throws UserServiceException;

    /**
     * Finds a user by username
     * @param username the username of the user
     * @return the user
     * @throws UserServiceException when the user cannot be found
     */
    User findUserByUsername(String username) throws UserServiceException;

    /**
     * Finds a user by email
     * @param email the email of the user
     * @return the user
     * @throws UserServiceException when the user cannot be found
     */
    User findUserByEmail(String email) throws UserServiceException;

    /**
     * Creates a new user. Email and username have to be unique
     * @param user the user to be created
     * @return the new user
     * @throws UserServiceException
     */
    User saveUser(User user) throws UserServiceException;

    /**
     * Updates user.
     * @param user the user to update
     * @return the updated user
     * @throws UserServiceException
     */
    User updateUser(User user) throws UserServiceException;

    /**
     * Changes password of user if oldPassword matches existing password
     * @param oldPassword the current password
     * @param newPassword the new password
     * @param userId the id of the user
     * @throws UserServiceException when the passwords don't match
     */
    void changePassword(String oldPassword, String newPassword, Integer userId) throws UserServiceException;

    /**
     * Finds the organisations the user is part of or is organiser of
     * @param user the user to find the organisations for
     * @return a list of organisations
     */
    List<Organisation> findOrganisations(User user) throws UserServiceException;
}
