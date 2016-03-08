package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by amy on 7/03/2016.
 */
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {
}
