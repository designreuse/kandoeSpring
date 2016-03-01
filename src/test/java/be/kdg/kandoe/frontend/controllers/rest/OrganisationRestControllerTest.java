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
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
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
public class OrganisationRestControllerTest {

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
    public void testGetOrganisations() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/organisations")
                .header("Authorization", token))
                .andExpect(jsonPath("$").isArray())
                .andDo(print());
    }

    @Test
    public void testGetOrganisationById() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/organisations/1")
                .header("Authorization", token))
                .andExpect(jsonPath("$.organisationId", is(1)))
                .andDo(print());
    }

    @Test
    public void testGetOrganisationOrganisers() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/organisations/1/organisers")
                    .header("Authorization", token))
                    .andDo(print())
                    .andExpect(jsonPath("$.[0].username", is("ArneLauryssens")));
    }

    @Test
    public void testGetOrganisationMembers() throws Exception {
        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        mockMvc.perform(get("/api/organisations/1/members")
                .header("Authorization", token))
                .andDo(print())
                .andExpect(jsonPath("$.[0].username", is("SenneWens")));
    }
}
