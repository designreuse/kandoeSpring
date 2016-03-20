package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.frontend.config.RootContextConfig;
import be.kdg.kandoe.frontend.config.WebContextConfig;
import be.kdg.kandoe.frontend.config.security.WebSecurityConfig;
import org.hamcrest.Matchers;
import org.json.JSONArray;
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

import static org.hamcrest.core.Is.is;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by amy on 13/02/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
@TestPropertySource("/application.properties")
public class UserRestControllerTest {

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
    public void testFindUserById() throws Exception
    {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(get("/api/users/1").header("Authorization", token)).
                andExpect(jsonPath("$.username", is("ArneLauryssens")))
                .andDo(print());
    }

    @Test
    public void testFindLoggedInUser() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(get("/api/users/currentUser").header("Authorization", token)).
                andExpect(jsonPath("$.username", is("ArneLauryssens")))
                .andDo(print());
    }

    @Test
    public void testCreateUser() throws Exception
    {
        JSONObject userResource = new JSONObject();
        JSONObject personResource = new JSONObject();

        personResource.put("firstname", "Amy");
        personResource.put("lastname", "Peerlinck");
        userResource.put("person", personResource);
        userResource.put("username", "amy_peerlinck@hotmail.com");
        userResource.put("password", "test123");
        userResource.put("email", "amy_peerlinck@hotmail.com");
        JSONArray jsonArray = new JSONArray();
        jsonArray.put(0, "ROLE_PLAYER");
        jsonArray.put(1, "ROLE_ORGANISER");
        userResource.put("roles", jsonArray);

        mockMvc.perform(post("/api/users")
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", Matchers.is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbXlfcGVlcmxpbmNrQGhvdG1haWwuY29tIiwiZmFjZWJvb2tBY2NvdW50IjpmYWxzZX0.jGQYrhxMQPIiCtRt0vnkctk0Chk04b0RJ8vffigL1AE")))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    public void testCreateUserWithExistingEmail() throws Exception {
        JSONObject userResource = new JSONObject();
        JSONObject personResource = new JSONObject();

        personResource.put("firstname", "Arne");
        personResource.put("lastname", "Lauryssens");
        userResource.put("person", personResource);
        userResource.put("username", "arne.lauryssens@student.kdg.be");
        userResource.put("password", "test123");
        userResource.put("email", "arne.lauryssens@student.kdg.be");
        JSONArray jsonArray = new JSONArray();
        jsonArray.put(0, "ROLE_PLAYER");
        jsonArray.put(1, "ROLE_ORGANISER");
        userResource.put("roles", jsonArray);

        mockMvc.perform(post("/api/users").
                content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andDo(print());
    }

    @Test
    public void testUpdateUserWithSecurity() throws Exception
    {
        JSONObject userResource = new JSONObject();
        JSONObject personResource = new JSONObject();
        personResource.put("firstname", "Jo");
        personResource.put("lastname", "Lauryssens");
        userResource.put("person",personResource);

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(post("/api/users/updateUser")
                .header("Authorization", token)
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(jsonPath("$.person.firstname", is("Jo")))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateUserByIdWithWrongSecurity() throws Exception
    {
        JSONObject userResource = new JSONObject();
        JSONObject personResource = new JSONObject();
        personResource.put("firstname", "Jo");
        personResource.put("lastname", "Lauryssens");
        userResource.put("person",personResource);

        mockMvc.perform(post("/api/users/1")
                .header("Authorization", "testest")
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andDo(print());
    }

    @Test
    public void testChangePassword() throws Exception {
        JSONObject login = new JSONObject();
        login.put("username", "ArneLauryssens");
        login.put("password", "test123");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(jsonPath("$", Matchers.is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE")));

        JSONObject userResource = new JSONObject();
        userResource.put("oldPassword","test123");
        userResource.put("password", "test");

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(post("/api/users/changePassword")
                .header("Authorization", token)
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        login.put("password", "test");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(jsonPath("$", Matchers.is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE")));
    }

    @Test
    public void testChangePasswordWithWrongPassword() throws Exception {
        JSONObject login = new JSONObject();
        login.put("username", "ArneLauryssens");
        login.put("password", "test123");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(login.toString()))
                .andDo(print())
                .andExpect(jsonPath("$", Matchers.is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE")));

        JSONObject userResource = new JSONObject();
        userResource.put("oldPassword","test");
        userResource.put("password", "test");

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyIsImZhY2Vib29rQWNjb3VudCI6ZmFsc2V9.GKZ6dGYUb6VSgY0jOl4CDqa0Tpx-piuTRMknMzwiYYE\"";

        mockMvc.perform(post("/api/users/changePassword")
                .header("Authorization", token)
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }
}
