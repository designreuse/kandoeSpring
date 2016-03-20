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

import java.util.ArrayList;
import java.util.List;

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
    public void testGetOrganisationById() throws Exception {

        mockMvc.perform(get("/api/organisations/1")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.organisationId", is(1)))
                .andExpect(jsonPath("$.organiser", is(true)));

    }

    @Test
    public void testGetOrganisationByCurrentUser() throws Exception {

        mockMvc.perform(get("/api/organisations/currentUser")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.[0].organisationName", is("Karel De Grote")))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateOrganisationWithSecurity() throws Exception {
        JSONObject orgResource = new JSONObject();
        orgResource.put("organisationName", "KdG");
        orgResource.put("address", "Nationalestraat 5");

        HttpHeaders headers = new HttpHeaders();
        List<String> list = new ArrayList<>();
        list.add(appToken);
        headers.put("Authorization", list);

        System.out.println(orgResource.toString());
        mockMvc.perform(post("/api/organisations")
                .headers(headers)
                .content(orgResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.organisationName", is("KdG")))
                .andExpect(jsonPath("$.address", is("Nationalestraat 5")))
                .andExpect(jsonPath("$.organisationId", notNullValue()))
                .andExpect(status().isCreated())
                .andDo(print());
    }
    @Test
    public void testCreateOrganisationWithWrongSecurity() throws Exception {
        JSONObject orgResource = new JSONObject();
        orgResource.put("organisationName", "KdG");
        orgResource.put("address", "Nationalestraat 5");

        System.out.println(orgResource.toString());
        mockMvc.perform(post("/api/organisations")
                .header("Authorization", "testest")
                .content(orgResource.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andDo(print());
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

    @Test
    public void testAddOrganiserToOrganisation() throws Exception {
        mockMvc.perform(get("/api/organisations/1/organisers")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/organisations/1/addOrganiser?mail=jordan.parezys@student.kdg.be")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/organisations/1/organisers")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testAddOrganiserExistingMemberToOrganisation() throws Exception {
        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/organisations/1/addOrganiser?mail=senne.wens@student.kdg.be")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void testGetOrganisationThemes() throws Exception {
        mockMvc.perform(get("/api/organisations/1/themes")
                .header("Authorization", appToken))
                .andDo(print())
                .andExpect(jsonPath("$.[0].themeId", is(1)));
    }
}
