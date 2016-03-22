package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.frontend.config.RootContextConfig;
import be.kdg.kandoe.frontend.config.WebContextConfig;
import be.kdg.kandoe.frontend.config.security.WebSecurityConfig;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
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
@TestPropertySource("/application.properties")
public class SubThemeRestControllerTest {

    @Autowired
    WebApplicationContext webApplicationContext;

    @Autowired
    private Filter springSecurityFilterChain;

    private MockMvc mockMvc;

    @Value("${test.token}")
    private String appToken;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(springSecurityFilterChain).build();
    }


    @Test
    public void testGetThemesCurrentUser() throws Exception {
        mockMvc.perform(get("/api/subThemes/currentUser")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].subThemeName", is("Health")));
    }

    @Test
    public void testCreateSubTheme() throws Exception {
        JSONObject subTheme = new JSONObject();
        subTheme.put("subThemeName", "TestSubTheme");
        subTheme.put("description", "TestDescription");

        JSONObject org = new JSONObject();
        org.put("organisationId", 1);
        org.put("organisationName", "Karel De Grote");
        subTheme.put("organisation", org);
        subTheme.put("themeId", 1);

        mockMvc.perform(post("/api/subThemes")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(subTheme.toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateSubThemeWithoutOrganisation() throws Exception {
        JSONObject subTheme = new JSONObject();
        subTheme.put("subThemeName", "TestSubTheme");
        subTheme.put("description", "TestDescription");
        subTheme.put("themeId", 1);
        subTheme.put("organisation", 0);

        mockMvc.perform(post("/api/subThemes")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(subTheme.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }


    @Test
    public void testGetSubThemeCards() throws Exception {
        mockMvc.perform(get("/api/subThemes/1/cards")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0]", notNullValue()));
    }

    @Test
    public void testAddCardsToSubTheme() throws Exception {
        mockMvc.perform(post("/api/subThemes/1/addCards")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("[{\"cardId\":\"1\"},{\"cardId\":\"3\"},{\"cardId\":\"5\"}]"))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }
}
