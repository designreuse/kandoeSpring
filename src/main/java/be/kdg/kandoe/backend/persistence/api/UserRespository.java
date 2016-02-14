package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRespository extends JpaRepository<User, Integer>{
    User findUserByUserName(String userName);
}
