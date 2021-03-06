package be.kdg.kandoe.backend.config;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CircleSession.*;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.Address;
import be.kdg.kandoe.backend.dom.users.Person;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.*;
import be.kdg.kandoe.backend.services.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@Component
@Transactional
public class DataBaseInitializer implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private OrganisationService organisationService;

    @Autowired
    private ThemeRepository themeRepository;
    @Autowired
    private ThemeService themeService;
    @Autowired
    private SubThemeService subThemeService;
    @Autowired
    private SubThemeRepository subThemeRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private CardService cardService;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SessionService sessionService;

    @Autowired
    private CardSessionRepository cardSessionRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try {

            User user = new User();
            if (userRepository.findUserByUsername("ArneLauryssens") == null) {
                Address address = new Address();
                address.setCity("TestCity");
                address.setNumber("1");
                address.setStreet("TestStreet");
                address.setZip("2000");

                Person p = new Person();
                p.setFirstname("Arne");
                p.setLastname("Lauryssens");
                p.setAddress(address);

                user.setPerson(p);
                user.setPassword("test123");
                user.setEmail("arne.lauryssens@student.kdg.be");
                user.setUsername("ArneLauryssens");
                user.setFacebookAccount(false);
                user.setProfilePicture("resources/images/users/1.jpg");
                user = userService.saveUser(user);
            }

            User mailUser = new User();
            if (userRepository.findUserByUsername("MailUser") == null) {
                mailUser.setEmail("demoodooconf@gmail.com");
                mailUser.setUsername("MailUser");
                mailUser.setPassword("test123");
                mailUser.setFacebookAccount(false);
                mailUser.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
                userService.saveUser(mailUser);
            }

            Organisation org = new Organisation();
            if (organisationRepository.findOrganisationByOrganisationName("Karel De Grote") == null && user.getId() != null) {
                org.setOrganisationName("Karel De Grote");
                org.setAddress("Groenplaats 5 2000 Antwerpen");
                org.setLogoURL("resources/images/initialize/kdg-logo.png");
                org = organisationService.saveOrganisation(org, user.getId());
            }

            Organisation org2 = new Organisation();
            if (organisationRepository.findOrganisationByOrganisationName("Studenten organisatie") == null && mailUser.getId() != null) {
                org2.setOrganisationName("Studenten organisatie");
                org2.setAddress("Groenplaats 5 2000 Antwerpen");
                org2.setLogoURL("resources/images/initialize/students.jpg");
                org2 = organisationService.saveOrganisation(org2, mailUser.getId());
            }

            Theme theme = new Theme();
            if (themeRepository.findOne(1) == null && user.getId() != null) {
                theme.setThemeName("KdG students");
                theme.setDescription("Changes for KdG students, what they want");
                theme.setIconURL("resources/images/initialize/students.jpg");
                theme.setOrganisation(org);
                theme = themeService.saveTheme(theme, user.getUserId(), 1);
            }

            Theme theme2 = new Theme();
            if (themeRepository.findOne(2) == null && mailUser.getId() != null) {
                theme2.setThemeName("MailTheme");
                theme2.setDescription("Mail Theme description");
                theme2.setIconURL("http://www.dandai.be/Resources/imgp1791.jpeg");
                theme2.setOrganisation(org2);
                theme2 = themeService.saveTheme(theme2, mailUser.getUserId(), org2.getId());
            }


            Card card = new Card();
            if (cardRepository.findCardByDescription("We have to much the same teacher, we want have more different teachers") == null) {
                card.setDescription("We have to much the same teacher, we want have more different teachers");
                card.setImageURL("resources/images/initialize/teacher.jpg");
                cardService.saveCard(card, theme.getId());
            }
            Card card1 = new Card();
            if (cardRepository.findCardByDescription("We want more healthy food at KdG") == null) {
                card1.setDescription("We want more healthy food at KdG");
                card1.setImageURL("resources/images/initialize/healty-food.jpg");
                cardService.saveCard(card1, theme.getId());
            }
            Card card2 = new Card();
            if (cardRepository.findCardByDescription("We want max 5hours class a day") == null) {
                card2.setDescription("We want max 5hours class a day");
                card2.setImageURL("resources/images/initialize/less-classes.jpg");
                cardService.saveCard(card2, theme.getId());
            }
            Card card3 = new Card();
            if (cardRepository.findCardByDescription("We want more new courses") == null) {
                card3.setDescription("We want more new courses");
                card3.setImageURL("resources/images/initialize/more-courses.jpg");
                cardService.saveCard(card3, theme.getId());
            }
            Card card4 = new Card();
            if (cardRepository.findCardByDescription("We want more sport at school, encourage taking the stairs") == null) {
                card4.setDescription("We want more sport at school, encourage taking the stairs");
                card4.setImageURL("resources/images/initialize/exercise-stairs.jpg");
                cardService.saveCard(card4, theme.getId());
            }
            Card card5 = new Card();
            if (cardRepository.findCardByDescription("The groups are to big, we don't get enough attention") == null) {
                card5.setDescription("The groups are to big, we don't get enough attention");
                card5.setImageURL("resources/images/initialize/smaller-class-group.jpg");
                cardService.saveCard(card5, theme.getId());
            }

            SubTheme subTheme = new SubTheme();
            if (subThemeRepository.findOne(1) == null && mailUser.getId() != null) {
                subTheme.setSubThemeName("Health");
                subTheme.setDescription("Students wants more attention for the health");
                subTheme.setIconURL("resources/images/initialize/health.jpg");
                subTheme.setOrganisation(org);
                Set<Card> cardsSubTheme = new HashSet<>();
                cardsSubTheme.add(card1);
                cardsSubTheme.add(card4);
                subTheme.setCards(cardsSubTheme);
                subTheme = subThemeService.saveSubTheme(subTheme, user.getUserId(), theme.getThemeId());

            }


            User user2 = new User();
            if (userRepository.findUserByUsername("SenneWens") == null) {
                Person p = new Person();
                p.setFirstname("Senne");
                p.setLastname("Wens");

                user2.setPerson(p);
                user2.setPassword("test123");
                user2.setEmail("senne.wens@student.kdg.be");
                user2.setUsername("SenneWens");
                List<Organisation> orgs = new ArrayList<>();
                orgs.add(org);
                user2.setOrganisations(orgs);
                user2.setFacebookAccount(false);
                user2.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
                user2 = userService.saveUser(user2);
            }

            User user3 = new User();
            if (userRepository.findUserByUsername("JordanParezys") == null) {
                Person p = new Person();
                p.setFirstname("Jordan");
                p.setLastname("Parezys");

                user3.setPerson(p);
                user3.setPassword("test123");
                user3.setEmail("jordan.parezys@student.kdg.be");
                user3.setUsername("JordanParezys");
                user3.setFacebookAccount(false);
                user3.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
                user3 = userService.saveUser(user3);
            }

            Session session = new Session();
            CardSession cardSession = new CardSession();
            UserSession userSession = new UserSession();
            UserSession userSession1 = new UserSession();
            if (sessionRepository.findOne(1) == null && user.getId() != null) {
                session.setStartTime(LocalDateTime.now().minusHours(1));
                session.setSessionName("KdG students session");
                session.setEndTime(LocalDateTime.of(2016, Month.APRIL, 1, 12, 0));
                session.setMaxCards(4);
                session.setMinCards(2);
                session.setMode(SessionMode.SYNC);
                session.setType(SessionType.IDEA);
                session.setState(SessionState.CREATED);
                session.setTheme(theme);
                ArrayList<CardSession> cardSessions = new ArrayList<>();

                cardSession.setCard(card);

                cardSessions.add(cardSession);
                //cardSession = cardSessionRepository.save(cardSession);
                card.setCardSessions(cardSessions);
                session.setCardSessions(cardSessions);

                session.setUserAddCards(true);
                List<UserSession> userSessions = new ArrayList<>();

                userSession.setUser(user);
                userSession1.setUser(user2);
                userSession1.setUserPosition(1);
                userSessions.add(userSession);
                userSessions.add(userSession1);
                // userSession = userSessionRepository.save(userSession);

                session.setUserSessions(userSessions);
                session.setSize(6);
                session = sessionRepository.save(session);
                user.setUserSessions(new ArrayList<UserSession>(Arrays.asList(userSession)));
                userRepository.save(user);
                user2.setUserSessions(new ArrayList<UserSession>(Arrays.asList(userSession1)));
                userSession.setSession(session);
                userSession1.setSession(session);
                userSessionRepository.save(userSession);
                userSessionRepository.save(userSession1);
                cardSession.setSession(session);
                cardSessionRepository.save(cardSession);
            }

            Session sessionSubThema = new Session();
            CardSession cardSessionSubThema = new CardSession();
            UserSession userSessionSubThema = new UserSession();
            UserSession userSession1SubThema = new UserSession();
            if (sessionRepository.findOne(2) == null && user.getId() != null) {
                sessionSubThema.setStartTime(LocalDateTime.now());
                sessionSubThema.setSessionName("Session Subtheme");
                sessionSubThema.setEndTime(LocalDateTime.of(2016, Month.APRIL, 1, 12, 0));
                sessionSubThema.setMaxCards(4);
                sessionSubThema.setMinCards(2);
                sessionSubThema.setMode(SessionMode.SYNC);
                sessionSubThema.setType(SessionType.IDEA);
                sessionSubThema.setState(SessionState.CREATED);
                sessionSubThema.setSubTheme(subTheme);
                ArrayList<CardSession> cardSessions = new ArrayList<>();

                cardSessionSubThema.setCard(card);

                cardSessions.add(cardSessionSubThema);
                //cardSession = cardSessionRepository.save(cardSession);
                card.setCardSessions(cardSessions);
                sessionSubThema.setCardSessions(cardSessions);

                sessionSubThema.setUserAddCards(true);
                List<UserSession> userSessions = new ArrayList<>();

                userSessionSubThema.setUser(user);
                userSession1SubThema.setUser(user2);
                userSession1SubThema.setUserPosition(1);
                userSessions.add(userSessionSubThema);
                userSessions.add(userSession1SubThema);
                // userSession = userSessionRepository.save(userSession);

                sessionSubThema.setUserSessions(userSessions);
                sessionSubThema.setSize(6);
                sessionSubThema = sessionRepository.save(sessionSubThema);
                user.setUserSessions(new ArrayList<UserSession>(Arrays.asList(userSession, userSessionSubThema)));
                userRepository.save(user);
                user2.setUserSessions(new ArrayList<UserSession>(Arrays.asList(userSession1, userSession1SubThema)));
                userSessionSubThema.setSession(sessionSubThema);
                userSession1SubThema.setSession(sessionSubThema);
                userSessionRepository.save(userSessionSubThema);
                userSessionRepository.save(userSession1SubThema);
                cardSession.setSession(sessionSubThema);
                cardSessionRepository.save(cardSessionSubThema);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
