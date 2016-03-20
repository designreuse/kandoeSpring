package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.Card;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Card with standard crud operations.
 * Can also find a card by its description.
 */

public interface CardRepository extends JpaRepository<Card, Integer> {
    Card findCardByDescription(String cardDescription);
}
