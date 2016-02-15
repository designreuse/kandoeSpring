package be.kdg.kandoe.backend.services.impl;

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
import java.util.List;

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
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) throws UserServiceException
    {
        User existingUser = userRepository.findUserByEmail(user.getEmail());

        if(existingUser != null)
            throw new UserServiceException("Email already in use");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        User u = userRepository.save(user);

        if (u == null)
            throw new UserServiceException("User not saved");

        return u;
    }

/*    @Override
    public User addUser(User user) throws UserServiceException
    {
        user.setEncryptedPassword(passwordEncoder.encode(user.getEncryptedPassword()));
        return this.saveUser(user);
    }*/

    @Override
    public void checkLogin(Integer userId, String password) throws UserServiceException {
        User u = userRepository.findOne(userId);

        if(u == null || !password.equals(u.getPassword())){
            throw new UserServiceException("Foutieve gebruikersnaam of paswoord.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User u = userRepository.findUserByUsername(s);

        if (u == null) throw new UsernameNotFoundException("No such user: " + s);

        return u;
    }
}
