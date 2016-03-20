package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for CardSession with standard crud operations
 */
public interface CardSessionRepository extends JpaRepository<CardSession, Integer> {
}
