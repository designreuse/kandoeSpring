package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.other.SubTheme;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Subtheme with standard crud operations.
 */
public interface SubThemeRepository extends JpaRepository<SubTheme, Integer> {
}
