package be.kdg.kandoe.backend.persistence.api;

import be.kdg.kandoe.backend.dom.game.Card;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Annelies on 22/02/2016.
 */

public interface CardRepository extends JpaRepository<Card, Integer> {
    Card findCardByDescription(String cardDescription);
   // List<Card> findCardsByTheme(Theme theme);
}
