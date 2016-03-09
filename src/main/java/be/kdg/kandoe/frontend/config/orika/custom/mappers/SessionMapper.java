package be.kdg.kandoe.frontend.config.orika.custom.mappers;

import be.kdg.kandoe.backend.dom.game.CircleSession.CardSession;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.frontend.DTO.CardDTO;
import be.kdg.kandoe.frontend.DTO.SessionDTO;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SessionMapper extends CustomMapper<Session, SessionDTO>{
    @Override
    public void mapAtoB(Session session, SessionDTO sessionDTO, MappingContext context) {
        List<CardDTO> cards = new ArrayList<>();
        for (CardSession cardSession : session.getCardSessions()) {
            CardDTO carddto = new CardDTO();
            mapperFacade.map(cardSession.getCard(), carddto);
            carddto.setPosition(cardSession.getPosition());
            cards.add(carddto);
        }
        sessionDTO.setCards(cards);

        List<UserDTO> users = new ArrayList<>();
        for(UserSession userSession : session.getUserSessions()){
            UserDTO userDTO = new UserDTO();
            mapperFacade.map(userSession.getUser(), userDTO);
            userDTO.setPosition(userSession.getUserPosition());
            users.add(userDTO);
        }
        sessionDTO.setUsers(users);
    }

    @Override
    public void mapBtoA(SessionDTO sessionDTO, Session session, MappingContext context) {
        super.mapBtoA(sessionDTO, session, context);
    }
}
