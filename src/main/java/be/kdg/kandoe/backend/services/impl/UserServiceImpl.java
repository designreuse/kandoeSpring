package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final Logger logger = Logger.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRespository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRespository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findUserById(Integer userId) throws UserServiceException{
        logger.info(this.getClass().toString() + ": finding user " + userId);
        User user = userRepository.findOne(userId);

        if(user == null){
            logger.warn(this.getClass().toString() + ": cannot find user " + userId);
            throw new UserServiceException("User not found");
        }

        logger.info(this.getClass().toString() + ": found user " + userId);
        return user;
    }

    @Override
    public User findUserByUsername(String username) throws UserServiceException {
        logger.info(this.getClass().toString() + ": finding user with username " + username);
        User user = userRepository.findUserByUsername(username);

        if (user == null){
            logger.warn(this.getClass().toString() + ": cannot find user with username " + username);
            throw new UserServiceException("User not found");
        }

        logger.info(this.getClass().toString() + ": found user with username " + username);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws UserServiceException {
        logger.info(this.getClass().toString() + ": finding user with email " + email);
        User u = userRepository.findUserByEmail(email);

        if (u == null){
            logger.warn(this.getClass().toString() + ": cannot find user with email " + email);
            throw new UserServiceException("User not found");
        }

        logger.info(this.getClass().toString() + ": found user with email " + email);
        return u;
    }


    public User saveUser(User user) throws UserServiceException
    {
        logger.info(this.getClass().toString() + ": creating new user");
        User existingUser = userRepository.findUserByEmail(user.getEmail());
        User existingUsername = userRepository.findUserByUsername(user.getUsername());

        if(existingUser != null && user.getId() == null){
            logger.warn(this.getClass().toString() + ": failed to cretae new user because email is already in use");
            throw new UserServiceException("Email already in use");
        }

        if(existingUsername != null && user.getId() == null){
            logger.warn(this.getClass().toString() + ": failed to create new user because username is already in use");
            throw new UserServiceException("Username already in use");
        }

        if(!user.isFacebookAccount()){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        User u = userRepository.save(user);

        logger.info(this.getClass().toString() + ": created new user");
        return u;
    }

    public User updateUser(User user) throws UserServiceException {
        logger.info(this.getClass().toString() + ": updating user");
        User existingUser = userRepository.findUserByEmail(user.getEmail());
        User existingUsername = userRepository.findUserByUsername(user.getUsername());

        if(existingUser == null || !existingUser.getEmail().equals(user.getEmail())){
            logger.warn(this.getClass().toString() + ": failed to update user");
            throw new UserServiceException("Can't change email");
        }

        if(existingUsername == null || !existingUsername.getUsername().equals(user.getUsername()))  {
            logger.warn(this.getClass().toString() + ": failed to update user");
            throw new UserServiceException("Can't change username");
        }

        User u = userRepository.save(user);

        logger.info(this.getClass().toString() + ": user updated");
        return u;
    }

    public void changePassword(String oldPassword, String newPassword, Integer userId) throws UserServiceException {
        logger.info(this.getClass().toString() + ": changing password of user " + userId);
        User existingUser = findUserById(userId);

        if(!passwordEncoder.matches(oldPassword, existingUser.getPassword())){
            logger.warn(this.getClass().toString() + ": failed to change password because passwords don't match");
            throw new UserServiceException("Passwords don't match");
        }

        existingUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existingUser);
        logger.info(this.getClass().toString() + ": changed password of user " + userId);
    }

    @Override
    public List<Organisation> findOrganisations(User user) throws UserServiceException {
        logger.info(this.getClass().toString() + ": finding organisations of user " + user.getUsername());
        User currUser = null;
        try {
            currUser = this.findUserByUsername(user.getUsername());
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + "failed to find organisations of user " + user.getUsername(), e);
            throw e;
        }

        Set<Organisation> orgs = new HashSet<>();
        orgs.addAll(currUser.getOrganisations());
        orgs.addAll(currUser.getOwnOrganisations());

        logger.info(this.getClass().toString() + ": found organisations of user " + user.getUsername());
        return new ArrayList<>(orgs);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User u = userRepository.findUserByUsername(s);

        if (u == null) throw new UsernameNotFoundException("No such user: " + s);

        return u;
    }
}
