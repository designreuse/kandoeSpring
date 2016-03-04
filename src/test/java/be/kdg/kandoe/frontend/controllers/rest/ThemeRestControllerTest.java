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

    @Before
    public void setup()
    {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(springSecurityFilterChain).build();
    }

    @Test
    public void testCreateTheme() throws Exception{
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";
        JSONObject theme = new JSONObject();
        theme.put("themeName", "TestTheme");
        theme.put("description", "TestDescription");
        JSONObject org = new JSONObject();
        org.put("organisationId", 1);
        org.put("organisationName", "Karel De Grote");
        theme.put("organisation", org);

        mockMvc.perform(post("/api/themes")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(theme.toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateThemeWithoutOrganisation() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";
        JSONObject theme = new JSONObject();
        theme.put("themeName", "TestTheme");
        theme.put("description", "TestDescription");

        mockMvc.perform(post("/api/themes")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(theme.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testGetThemesCurrentUser() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(get("/api/themes/currentUser")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(jsonPath("$.[0].themeName", is("KdGTheme")));
    }
}
