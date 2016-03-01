package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRespository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRespository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findUserById(Integer userId) throws UserServiceException{
        User user = userRepository.findOne(userId);

        if(user == null)
            throw new UserServiceException("User not found");

        return user;
    }

    @Override
    public User findUserByUsername(String username) throws UserServiceException {
        User user = userRepository.findUserByUsername(username);

        if (user == null)
            throw new UserServiceException("User not found");

        return user;
    }

    @Override
    public User findUserByEmail(String email) throws UserServiceException {
        User u = userRepository.findUserByEmail(email);

        if(u == null){
            throw new UserServiceException("User not found");
        }

        return u;
    }

    @Override
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) throws UserServiceException
    {
        User existingUser = userRepository.findUserByEmail(user.getEmail());
        User existingUsername = userRepository.findUserByUsername(user.getUsername());

        if(existingUser != null && user.getId() == null)
            throw new UserServiceException("Email already in use");

        if(existingUsername != null && user.getId() == null)
            throw new UserServiceException("Username already in use");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User u = userRepository.save(user);

        if (u == null)
            throw new UserServiceException("User not saved");

        return u;
    }

    public User updateUser(User user) throws UserServiceException {
        User existingUser = userRepository.findUserByEmail(user.getEmail());
        User existingUsername = userRepository.findUserByUsername(user.getUsername());

        if(existingUser == null || !existingUser.getEmail().equals(user.getEmail()))
            throw new UserServiceException("Can't change email");

        if(existingUsername == null || !existingUsername.getUsername().equals(user.getUsername()))
            throw new UserServiceException("Can't change username");

       // existingUser.setPerson(user.getPerson());
        User u = userRepository.save(user);

        if (u == null)
            throw new UserServiceException("User not saved");

        return u;
    }

    public void changePassword(String oldPassword, String newPassword, Integer userId) throws UserServiceException {
        User existingUser = findUserById(userId);

        if(!passwordEncoder.matches(oldPassword, existingUser.getPassword()))
            throw new UserServiceException("Passwords don't match");

        existingUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existingUser);
    }

    @Override
    public void checkLogin(Integer userId, String password) throws UserServiceException {
        User u = userRepository.findOne(userId);

        if(u == null || !password.equals(u.getPassword())){
            throw new UserServiceException("Foutieve gebruikersnaam of paswoord.");
        }
    }

    @Override
    public List<Organisation> findOrganisations(User user) {
        User currUser = userRepository.findUserByUsername(user.getUsername());
        Set<Organisation> orgs = new HashSet<>();
        orgs.addAll(currUser.getOrganisations());
        orgs.addAll(currUser.getOwnOrganisations());
        return new ArrayList<>(orgs);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User u = userRepository.findUserByUsername(s);

        if (u == null) throw new UsernameNotFoundException("No such user: " + s);

        return u;
    }
}
