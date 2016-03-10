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

import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by amy on 7/03/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
@TestPropertySource("/application.properties")
public class SessionRestControllerTest {
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
    public void testGetSessionById() throws Exception{
        mockMvc.perform(get("/api/sessions/1")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.sessionId", is(1)));
    }

    @Test
    public void testGetSessionsCurrentUser() throws Exception {

        mockMvc.perform(get("/api/sessions/currentUser")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testCreateSession() throws Exception {
        JSONObject session = new JSONObject();
        session.put("mode", "SYNC");
        session.put("type", "IDEA");
        session.put("minCards", 1);
        session.put("maxCards", 5);
        session.put("userAddCards", false);
        session.put("startTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        session.put("endTime", LocalDateTime.of(2016, Month.APRIL, 1, 12, 0).format(DateTimeFormatter.ISO_DATE_TIME));
        session.put("size", 5);
        session.put("themeId", 1);

        mockMvc.perform(post("/api/sessions")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(session.toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateSessionWrongTheme() throws Exception {
        JSONObject session = new JSONObject();
        session.put("mode", "SYNC");
        session.put("type", "IDEA");
        session.put("minCards", 1);
        session.put("maxCards", 5);
        session.put("userAddCards", false);
        session.put("startTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        session.put("endTime", LocalDateTime.of(2016, Month.APRIL, 1, 12, 0).format(DateTimeFormatter.ISO_DATE_TIME));
        session.put("size", 5);
        session.put("themeId", 2);

        mockMvc.perform(post("/api/sessions")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(session.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testAddCardsToSession() throws Exception {

        mockMvc.perform(post("/api/sessions/1/addCards")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("[{\"cardId\":\"1\"},{\"cardId\":\"3\"},{\"cardId\":\"5\"}]"))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }
}
