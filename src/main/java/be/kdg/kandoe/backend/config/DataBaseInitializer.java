package be.kdg.kandoe.backend.config;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.Address;
import be.kdg.kandoe.backend.dom.users.Person;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.CardRepository;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import be.kdg.kandoe.backend.persistence.api.UserRepository;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class DataBaseInitializer implements ApplicationListener<ContextRefreshedEvent>{

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
    private CardRepository cardRepository;
    @Autowired
    private CardService cardService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        User user = new User();
        if(userRepository.findUserByUsername("ArneLauryssens") == null){
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
            user = userService.saveUser(user);
            System.out.println("User created");
        }

        Organisation org = new Organisation();

        if(organisationRepository.findOrganisationByOrganisationName("Karel De Grote") == null && user.getId() != null){
            org.setOrganisationName("Karel De Grote");
            org.setAddress("Groenplaats 5 2000 Antwerpen");
            org.setLogoURL("http://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            organisationService.saveOrganisation(org, user.getId());
        }

        Theme theme =new Theme();

        if(themeRepository.findThemeByThemeName("KdGTheme") ==null  && user.getId() != null){
            theme.setThemeName("KdGTheme");
            theme.setDescription("KdG Theme description");
            theme.setIconURL("http://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
            theme = themeService.saveTheme(theme, user.getUserId());
        }

        Card card = new Card();

        if(cardRepository.findCardByDescription("KdGCard") ==null  && user.getId() != null){
          card.setDescription("KdGCard");
            card.setImageURL("http://www.underconsideration.com/brandnew/archives/karel_de_grote_logo_detail.png");
          cardService.saveCard(card, theme.getId());
        }
    }
}
