package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Theme with standard crud operations.
 */
public interface ThemeRepository extends JpaRepository<Theme, Integer> {
}
