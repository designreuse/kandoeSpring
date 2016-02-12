package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.users.Address;
import be.kdg.kandoe.backend.dom.users.Person;
import be.kdg.kandoe.backend.dom.users.Roles.Organiser;
import be.kdg.kandoe.backend.dom.users.Roles.Player;
import be.kdg.kandoe.backend.dom.users.Roles.Role;
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
/*@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class})*/
public class UserServiceTest {
        @Value("fakeuser@hotmail.com")
        private String fakeUsername;

        @Value("amy_peerlinck@hotmail.com")
        private String realUsername;

        @Autowired
        private UserService userService;

        @Test(expected = UserServiceException.class)
        public void getFalseUserTest() throws UserServiceException
        {
                userService.findUserByUsername(fakeUsername);
        }

        @Test
        public void getExistingUserTest() throws UserServiceException
        {
                User clarence = userService.findUserByUsername(realUsername);
                assertThat(clarence, notNullValue());
        }

        @Test(expected = UserServiceException.class)
        public void testCheckLogin() throws Exception
        {
                User clarence = userService.findUserById(1);
                userService.checkLogin(clarence.getId(), realUsername);
                userService.checkLogin(clarence.getId(), fakeUsername);
        }

/*
        @Test
        public void testFindUserById() throws Exception {
                User user = userService.findUserById(1);
                assertThat(user, notNullValue());
        }

        @Test
        public void testFindUserByUsername() throws Exception {
                User clarence = userService.findUserByUsername(realUsername);
                assertThat(clarence.getUsername(), equalToIgnoringCase(realUsername));
        }

        @Test
        public void testFindUserByRole() throws Exception
        {
                List<User> users = userService.findUsersByRole(Player.class);
                users.forEach(user -> assertThat(Role.loadRole(user, Player.class), instanceOf(Player.class)));
        }
*/


/*
        @Test
        public void testUpdateUser() throws Exception
        {
                User clarence = userService.findUserByUsername(realUsername);

                Person p = new Person(new Address("Borrekent", "31", "9450", "Denderhoutem"),"Amy", "Peerlinck");
                userService.updateUser(clarence.getId(), p);
                clarence = userService.findUserByUsername(realUsername);
                assertThat(clarence.getPerson(), equalTo(p));
        }

        @Test
        public void testUpdatePassword() throws Exception
        {
                String currentPassword = "piano123";
                String newPassword = "$eCret";

                Person p = new Person(new Address("Borrekent", "31", "9450", "Denderhoutem"),"Amy", "Peerlinck");
                List<Role> identities = new ArrayList<>();
                identities.add(new Organiser("Master"));
                User user = new User(p, "amy_peerlinck@hotmail.com", currentPassword, identities);

                User user_out = userService.addUser(user);
                userService.updatePassword(user_out.getUserId(), currentPassword, newPassword);
        }
*/

/*        @Test
        public void testFindUsers() throws Exception
        {
                List<User> users = userService.findUsers();
                assertThat(users, is(not(empty())));
        }

        @Test
        public void testFindUsersByCriteria() throws Exception
        {
                String criterium1 = "Antwerpen";
                String criterium2 = "Nationale";
                List<SearchCriterium> searchCriteria = new ArrayList<>();
                searchCriteria.add(new SearchCriterium("city", SearchOperation.EQUALITY, criterium1));
                searchCriteria.add(new SearchCriterium("street", SearchOperation.EQUALITY, criterium2));

                List<User> users = userService.findUsersByCriteria(searchCriteria);
                users.forEach(u -> assertThat(u.getPerson().getAddress().getCity(), equalToIgnoringCase(criterium1)));
        }*/

/*
        @Test
        public void testAddUser() throws Exception
        {
                Person p = new Person("Wouter", "Deketelaere", new Address("Kleuterstraat", "1", "2800", "Mechelen"));
                List<Role> identities = new ArrayList<>();
                identities.add(new Repairer("Master"));
                identities.add(new Client());
                User user = new User(p, "wouter.deketelaere@kdg.be", "wouter", identities);
                userService.addUser(user);

                User wouter = userService.findUserByUsername("wouter.deketelaere@kdg.be");
                assertThat(user.getRoles(), hasItem(isA(Repairer.class)));
                assertThat(user.getRoles(), hasItem(isA(Client.class)));
                assertThat(user, equalTo(wouter));
        }

        @Test(expected = UserServiceException.class)
        public void testDeleteUser() throws Exception
        {
                userService.deleteUser(1);
                userService.findUserById(1);
        }
*/

}
