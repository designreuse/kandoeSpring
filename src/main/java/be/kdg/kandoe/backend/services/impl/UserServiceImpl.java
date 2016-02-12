package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRespository) {
        this.userRepository = userRespository;
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
    public void checkLogin(Integer userId, String password) throws UserServiceException {
        User u = userRepository.findOne(userId);

        if(u == null || !(password.equals(u.getPassword()))){
            throw new UserServiceException("Foutieve gebruikersnaam of paswoord.");
        }
    }
}
