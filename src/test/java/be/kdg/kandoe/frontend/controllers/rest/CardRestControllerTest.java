package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.dom.game.CardSession;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.services.api.CardService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.frontend.config.RootContextConfig;
import be.kdg.kandoe.frontend.config.WebContextConfig;
import be.kdg.kandoe.frontend.config.security.WebSecurityConfig;
import org.hamcrest.Matchers;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class CardRestControllerTest {
    @Autowired
    WebApplicationContext webApplicationContext;

    @Autowired
    private Filter springSecurityFilterChain;

    private MockMvc mockMvc;


    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(springSecurityFilterChain).build();
    }

    @Test
    public void testGetCards() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/cards")
                .header("Authorization", token))
                .andExpect(jsonPath("$").isArray())
                .andDo(print());

    }

    @Test
    public void testGetCardById() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/cards/1")
                .header("Authorization", token))
                .andExpect(jsonPath("$.cardId", is(1)))
                .andDo(print());
    }

    @Test
    public void testCreateCards() throws Exception {
        JSONObject cardResource = new JSONObject();
        cardResource.put("themeId", "1");
        cardResource.put("cardId", "1");
        cardResource.put("description", "KdGCard description");
        cardResource.put("imageURL", "http://www.google.be");
        System.out.println(cardResource.toString());

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(post("/api/cards")
                .header("Authorization", token)
                .content(cardResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(jsonPath("$.theme.themeId", Matchers.is(1)))
                .andExpect(jsonPath("$.description", Matchers.is("KdGCard description")))
                .andExpect(jsonPath("$.imageURL", Matchers.is("http://www.google.be")))
                .andExpect(status().isCreated());


    }
}
