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
import org.springframework.http.HttpHeaders;
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

import java.util.ArrayList;
import java.util.List;

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
public class SecurityTest {
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
    public void testLogin() throws Exception {
        JSONObject login = new JSONObject();
        login.put("username", "ArneLauryssens");
        login.put("password", "test123");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(jsonPath("$", is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE")));
    }

    @Test
    public void testLoginWrongUsername() throws Exception {
        JSONObject login = new JSONObject();
        login.put("username", "ArneLauryssen");
        login.put("password", "test123");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testLoginWrongPassword() throws Exception {
        JSONObject login = new JSONObject();
        login.put("username", "ArneLauryssens");
        login.put("password", "azer");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testNonExistingUser() throws Exception {

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0._0Pfx-9D58HiZpTpo0gn5NOniKree5yJTzD_a2I2LdI\"";

        mockMvc.perform(get("/api/organisations/currentUser")
                .header("Authorization", token))
                .andExpect(status().is4xxClientError())
                .andDo(print());
    }

}
