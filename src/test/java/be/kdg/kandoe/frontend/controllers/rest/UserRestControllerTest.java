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
    public void testGetAllUsers() throws Exception
    {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/users").header("Authorization", token)).
                andExpect(status().is2xxSuccessful()).
                andDo(print());
    }

    @Test
    public void testFindUserById() throws Exception
    {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/users/1").header("Authorization", token)).
                andExpect(jsonPath("$.username", is("ArneLauryssens")))
                .andDo(print());
    }

    @Test
    public void testFindLoggedInUser() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

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
                .andExpect(jsonPath("$", Matchers.is("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbXlfcGVlcmxpbmNrQGhvdG1haWwuY29tIn0.UlYd5co9iMo7U2yisZikmfRb5OL9ncwu68j1OZPtxFA")))
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
    public void testUpdateUserByIdWithSecurity() throws Exception
    {
        JSONObject userResource = new JSONObject();
        JSONObject personResource = new JSONObject();
        personResource.put("firstname", "Jo");
        personResource.put("lastname", "Lauryssens");
        userResource.put("person",personResource);

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(post("/api/users/1")
                .header("Authorization", token)
                .content(userResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.person.firstname", is("Jo")))
                .andExpect(status().isCreated())
                .andDo(print());
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
}
