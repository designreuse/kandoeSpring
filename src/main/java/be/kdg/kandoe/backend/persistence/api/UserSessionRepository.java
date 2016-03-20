package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for UserSession with standard crud operations.
 */
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {
}
