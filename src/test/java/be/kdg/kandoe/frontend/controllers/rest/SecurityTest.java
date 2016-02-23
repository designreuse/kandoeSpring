package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.users.Address;
import be.kdg.kandoe.backend.dom.users.Person;
import be.kdg.kandoe.backend.dom.users.Roles.Role;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.frontend.config.RootContextConfig;
import be.kdg.kandoe.frontend.config.WebContextConfig;
import be.kdg.kandoe.frontend.config.security.WebSecurityConfig;
import be.kdg.kandoe.frontend.config.security.jwt.UserAuthentication;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.securityContext;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootContextConfig.class, WebContextConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class SecurityTest {
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
    public void testgetOrganisationWithSecurity() throws Exception {
        JSONObject orgResource = new JSONObject();
        orgResource.put("organisationName", "KdG");
        orgResource.put("address", "Nationalestraat 5");

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        HttpHeaders headers = new HttpHeaders();
        List<String> list = new ArrayList<>();
        list.add(token);
        headers.put("Authorization", list);

        System.out.println(orgResource.toString());
        mockMvc.perform(get("/api/organisations")
                .headers(headers)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andDo(print());
    }

    @Test
    public void testCreateOrganisationWithSecurity() throws Exception {
        JSONObject orgResource = new JSONObject();
        orgResource.put("organisationName", "KdG");
        orgResource.put("address", "Nationalestraat 5");

        String token = "Bearer \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBcm5lTGF1cnlzc2VucyJ9.dblX_wcZ-FMOTqwhnVBvUVIthiR3YvRSLPt_mFds-PU\"";

        HttpHeaders headers = new HttpHeaders();
        List<String> list = new ArrayList<>();
        list.add(token);
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
}