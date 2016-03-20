package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for User with standard crud operations.
 * Can also find a user by its username or email
 */
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByUsername(String username);

    User findUserByEmail(String email);
}
