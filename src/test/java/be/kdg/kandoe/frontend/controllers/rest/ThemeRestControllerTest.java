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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
@TestPropertySource("/application.properties")
public class ThemeRestControllerTest {

    @Autowired
    WebApplicationContext webApplicationContext;

    @Autowired
    private Filter springSecurityFilterChain;

    private MockMvc mockMvc;

    @Value("${test.token}")
    private String appToken;

    @Before
    public void setup()
    {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(springSecurityFilterChain).build();
    }

    @Test
    public void testCreateTheme() throws Exception{
        JSONObject theme = new JSONObject();
        theme.put("themeName", "TestTheme");
        theme.put("description", "TestDescription");
        JSONObject org = new JSONObject();
        org.put("organisationId", 1);
        org.put("organisationName", "Karel De Grote");
        theme.put("organisation", org);

        mockMvc.perform(post("/api/themes")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(theme.toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateThemeWithoutOrganisation() throws Exception {
        JSONObject theme = new JSONObject();
        theme.put("themeName", "TestTheme");
        theme.put("description", "TestDescription");

        mockMvc.perform(post("/api/themes")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(theme.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testGetThemesCurrentUser() throws Exception {

        mockMvc.perform(get("/api/themes/currentUser")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].themeName", is("KdGTheme")));
    }

    @Test
    public void testGetThemeCards() throws Exception {
        mockMvc.perform(get("/api/themes/1/cards")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].description", is("KdGCard longer description to check if everything works accordingly")));
    }

    @Test
    public void testGetThemeSubthemes() throws Exception {
        mockMvc.perform(get("/api/themes/1/subThemes")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].subThemeName", is("SubThemeKdG")));
    }
}
