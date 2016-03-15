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
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
            user.setNewUser(true);
            user.setUsername("ArneLauryssens");
            user.setFacebookAccount(false);
            user.setProfilePicture("resources/images/users/1.jpg");
            user = userService.saveUser(user);
        }

        User mailUser = new User();
        if (userRepository.findUserByUsername("MailUser") == null) {
            mailUser.setEmail("demoodooconf@gmail.com");
            mailUser.setUsername("MailUser");
            mailUser.setNewUser(true);
            mailUser.setPassword("test123");
            mailUser.setFacebookAccount(false);
            mailUser.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
            userService.saveUser(mailUser);
        }

        Organisation org = new Organisation();
        if (organisationRepository.findOrganisationByOrganisationName("Karel De Grote") == null && user.getId() != null) {
            org.setOrganisationName("Karel De Grote");
            org.setAddress("Groenplaats 5 2000 Antwerpen");
            org.setLogoURL("https://pbs.twimg.com/profile_images/664027982718177280/YUs5qbQb.png");
            org = organisationService.saveOrganisation(org, user.getId());
        }

        Organisation org2 = new Organisation();
        if (organisationRepository.findOrganisationByOrganisationName("TestOrganisation") == null && mailUser.getId() != null) {
            org2.setOrganisationName("TestOrganisation");
            org2.setAddress("Groenplaats 5 2000 Antwerpen");
            org2.setLogoURL("https://pbs.twimg.com/profile_images/664027982718177280/YUs5qbQb.png");
            org2 = organisationService.saveOrganisation(org2, mailUser.getId());
        }

        Theme theme = new Theme();
        if (themeRepository.findThemeByThemeName("KdGTheme") == null && user.getId() != null) {
            theme.setThemeName("KdGTheme");
            theme.setDescription("KdG Theme description");
            theme.setIconURL("http://www.dandai.be/Resources/imgp1791.jpeg");
            theme.setOrganisation(org);
            theme = themeService.saveTheme(theme, user.getUserId(), 1);
        }

        Theme theme2 = new Theme();
        if (themeRepository.findThemeByThemeName("MailTheme") == null && mailUser.getId() != null) {
            theme2.setThemeName("MailTheme");
            theme2.setDescription("Mail Theme description");
            theme2.setIconURL("http://www.dandai.be/Resources/imgp1791.jpeg");
            theme2.setOrganisation(org2);
            theme2 = themeService.saveTheme(theme2, mailUser.getUserId(), org2.getId());
        }

        SubTheme subTheme = new SubTheme();
        if (themeRepository.findThemeByThemeName("SubThemeKdG") == null && mailUser.getId() != null) {
        subTheme.setThemeName("SubThemeKdG");
            subTheme.setDescription("KdG Subtheme description");
            subTheme.setIconURL("http://www.dandai.be/Resources/imgp1791.jpeg");
            subTheme.setOrganisation(org);
            subTheme=subThemeService.saveSubTheme(subTheme,theme.getThemeId());

        }
            Card card = new Card();
        if (cardRepository.findCardByDescription("KdGCard longer description to check if everything works accordingly") == null) {
            card.setDescription("KdGCard longer description to check if everything works accordingly");
            card.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card, theme.getId());
        }
        Card card1 = new Card();
        if (cardRepository.findCardByDescription("Testcard1") == null) {
            card1.setDescription("Testcard1");
            card1.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card1, theme.getId());
        }
        Card card2 = new Card();
        if (cardRepository.findCardByDescription("Testcard2") == null) {
            card2.setDescription("Testcard2");
            card2.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card2, theme.getId());
        }
        Card card3 = new Card();
        if (cardRepository.findCardByDescription("Testcard3") == null) {
            card3.setDescription("Testcard3");
            card3.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card3, theme.getId());
        }
        Card card4 = new Card();
        if (cardRepository.findCardByDescription("Testcard4") == null) {
            card4.setDescription("Testcard4");
            card4.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card4, theme.getId());
        }
        Card card5 = new Card();
        if (cardRepository.findCardByDescription("Testcard5") == null) {
            card5.setDescription("Testcard5");
            card5.setImageURL("https://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            cardService.saveCard(card5, theme.getId());
        }


        User user2 = new User();
        if (userRepository.findUserByUsername("SenneWens") == null) {
            Person p = new Person();
            p.setFirstname("Senne");
            p.setLastname("Wens");

            user2.setPerson(p);
            user2.setPassword("test123");
            user2.setEmail("senne.wens@student.kdg.be");
            user2.setNewUser(true);
            user2.setUsername("SenneWens");
            List<Organisation> orgs = new ArrayList<>();
            orgs.add(org);
            user2.setOrganisations(orgs);
            user2.setFacebookAccount(false);
            user2.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
            user2 = userService.saveUser(user2);
        }

        User user3 = new User();
        if(userRepository.findUserByUsername("JordanParezys") == null){
            Person p = new Person();
            p.setFirstname("Jordan");
            p.setLastname("Parezys");

            user3.setPerson(p);
            user3.setPassword("test123");
            user3.setEmail("jordan.parezys@student.kdg.be");
            user3.setNewUser(true);
            user3.setUsername("JordanParezys");
            user3.setFacebookAccount(false);
            user3.setProfilePicture("http://zblogged.com/wp-content/uploads/2015/11/c1.png");
            user3 = userService.saveUser(user3);
        }

        Session session = new Session();
        CardSession cardSession = new CardSession();
        UserSession userSession = new UserSession();
        UserSession userSession1 = new UserSession();
        if(sessionRepository.findOne(1) == null && user.getId() != null ){
            session.setStartTime(LocalDateTime.now());
            session.setSessionName("First session name");
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
    }
}
