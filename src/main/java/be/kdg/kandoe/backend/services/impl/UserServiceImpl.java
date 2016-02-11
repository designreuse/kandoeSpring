package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.UserRespository;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService{

    private final UserRespository userRepository;

    @Autowired
    public UserServiceImpl(UserRespository userRespository) {
        this.userRepository = userRespository;
    }

    @Override
    public User findUserById(Integer userId) throws UserServiceException{
        User user = userRepository.findOne(userId);

        if(user == null)
            throw new UserServiceException("User not found");

        return user;
    }
}
