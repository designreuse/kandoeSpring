package be.kdg.kandoe.frontend.controllers.rest;

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
import org.springframework.test.web.servlet.MvcResult;

import javax.servlet.Filter;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
@TestPropertySource("/application.properties")
public class OrganisationRestControllerTest {

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
    public void testGetOrganisations() throws Exception {
        System.out.println(appToken);

        mockMvc.perform(get("/api/organisations")
                .header("Authorization", appToken))
                .andExpect(jsonPath("$").isArray())
                .andDo(print());
    }

    @Test
    public void testGetOrganisationById() throws Exception {

        mockMvc.perform(get("/api/organisations/1")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.organisationId", is(1)))
                .andExpect(jsonPath("$.organiser", is(true)));

    }

    @Test
    public void testGetOrganisationOrganisers() throws Exception {
        mockMvc.perform(get("/api/organisations/1/organisers")
                    .header("Authorization", appToken))
                    .andDo(print())
                    .andExpect(jsonPath("$.[0].username", is("ArneLauryssens")));
    }

    @Test
    public void testGetOrganisationMembers() throws Exception {

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].username", is("SenneWens")));
    }

    @Test
    public void testAddMemberToOrganisation() throws Exception {

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/organisations/1/addMember?mail=jordan.parezys@student.kdg.be")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testAddMemberToOrganisationWrongOrganiser() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTZW5uZVdlbnMifQ.jBZ7bYVVhH-5BkBbWrHow7L4AvUQYMXeQyveC1GrrEU\"";

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/organisations/1/addMember?mail=jordan.parezys@student.kdg.be")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testAddNonExistingMemberToOrganisation() throws Exception {

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/organisations/1/addMember?mail=blablabla")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(status().is4xxClientError());

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}
