package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Session with standard crud operations
 */
public interface SessionRepository extends JpaRepository<Session, Integer> {

}
