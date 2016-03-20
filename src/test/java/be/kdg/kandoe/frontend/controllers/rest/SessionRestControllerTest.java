package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionMode;
import be.kdg.kandoe.backend.dom.game.CircleSession.SessionType;
import be.kdg.kandoe.backend.services.api.SessionService;
import be.kdg.kandoe.backend.services.api.ThemeService;
import be.kdg.kandoe.backend.services.exceptions.SessionServiceException;
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

    @Autowired
    private SessionService sessionService;
    @Autowired
    private ThemeService themeService;

    private MockMvc mockMvc;

    @Value("${test.token}")
    private String appToken;

    @Before
    public void setup() throws Exception {
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
    public void testGetSessionByThemeId() throws Exception {
        mockMvc.perform(get("/api/sessions/theme/1")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].sessionId", is(1)));
    }

   @Test
    public void testGetSessionsBySubThemeId() throws Exception {
        mockMvc.perform(get("/api/sessions/subtheme/1")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].sessionId", is(2)));
    }

    @Test
    public void testCreateSession() throws Exception {
        JSONObject session = new JSONObject();
        session.put("sessionName","First session name");
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
        session.put("sessionName","First session name");
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

    /*@Test
    public void testAddCardsToSession() throws Exception {

        mockMvc.perform(post("/api/sessions/1/addCards")
                .header("Authorization", appToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("[{\"cardId\":\"1\"},{\"cardId\":\"3\"},{\"cardId\":\"5\"}]"))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }*/

    @Test
    public void testStartSession() throws Exception {
        mockMvc.perform(post("/api/sessions/1/start")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.state").value("IN_PROGRESS"));
    }

    @Test
    public void testStopSession() throws Exception {
        Session s = new Session();
        s.setSessionName("Test session in progress");
        s.setMode(SessionMode.SYNC);
        s.setType(SessionType.IDEA);
        s.setMinCards(1);
        s.setMaxCards(5);
        s.setUserAddCards(false);
        s.setStartTime(LocalDateTime.now());
        s.setEndTime(LocalDateTime.of(2016, Month.APRIL, 1, 12, 0));
        s.setSize(5);
        s = sessionService.createSession(s, 1,0, 1);
        sessionService.startSession(s.getSessionId(), 1);

        mockMvc.perform(post("/api/sessions/" + s.getId() +"/stop")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.state").value("FINISHED"));
    }

    @Test
    public void testStopSessionWrongUser() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTZW5uZVdlbnMiLCJmYWNlYm9va0FjY291bnQiOmZhbHNlfQ.2QzOCf1E-rZOzAEmqemLlSXCsFPFrucZJaq9dyOnNqU\"";

        Session s = new Session();
        s.setSessionName("Test session in progress");
        s.setMode(SessionMode.SYNC);
        s.setType(SessionType.IDEA);
        s.setMinCards(1);
        s.setMaxCards(5);
        s.setUserAddCards(false);
        s.setStartTime(LocalDateTime.now());
        s.setEndTime(LocalDateTime.of(2016, Month.APRIL, 1, 12, 0));
        s.setSize(5);
        s = sessionService.createSession(s, 1,0, 1);
        sessionService.startSession(s.getSessionId(), 1);

        mockMvc.perform(post("/api/sessions/" + s.getId() +"/stop")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(jsonPath("$.state").value("IN_PROGRESS"));
    }

    @Test
    public void testGetChatHistory() throws Exception {
        mockMvc.perform(get("/api/sessions/1/chat")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }
}
