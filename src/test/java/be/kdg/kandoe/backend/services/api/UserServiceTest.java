package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Created by amy on 11/02/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class UserServiceTest {
    @Value("fakeuser@hotmail.com")
    private String fakeUsername;

    @Value("ArneLauryssens")
    private String realUsername;

    @Autowired
    private UserService userService;

    @Test(expected = UserServiceException.class)
    public void getFalseUserTest() throws UserServiceException {
        userService.findUserByUsername(fakeUsername);
    }

    @Test
    public void getExistingUserTest() throws UserServiceException {
        User arne = userService.findUserByUsername(realUsername);
        assertThat(arne, notNullValue());
    }

    @Test
    public void testFindUserById() throws Exception {
        User user = userService.findUserById(1);
        assertThat(user, notNullValue());
    }

    @Test
    public void testFindUserByUsername() throws Exception {
        User u = userService.findUserByUsername(realUsername);
        assertThat(u.getUsername(), equalToIgnoringCase(realUsername));
    }

}
