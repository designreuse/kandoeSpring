package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.users.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jordan on 1/03/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class MailServiceTest {

    @Autowired
    MailService mailService;

    @Autowired
    UserService userService;

    @Test
    public void sendMailToOneUser()throws Exception{
        mailService.sendMailToUser("MailUser","testSubject","I really hope this text shows up. I really do");
    }

    @Test
    public void sendMailToMulipleUsers(){
        List<String> recipients = new ArrayList<>();
        recipients.add("MailUser");
       // recipients.add("ArneLauryssens");
        //recipients.add("SenneWens");
        mailService.sendMailToUsers(recipients,"TestSubject","This should have gone out to 3 users: \n -Demo User \n -Arne \n -Senne \n enjoy boys :p");
    }

    @Test
    public void sendMailToUserById(){
        mailService.sendMailToUserByUserId(userService.findUserByUsername("MailUser").getId(),"TestSubject Id","This mail has been sent by the userId");
    }

    @Test
    public void sendMailToUsersById(){
        List<Integer> recipients = new ArrayList<>();
        recipients.add(userService.findUserByUsername("MailUser").getId());
        //recipients.add(userService.findUserByUsername("ArneLauryssens").getId());
        //recipients.add(userService.findUserByUsername("SenneWens").getId());

        mailService.sendMailToUsersByUserId(recipients,"TestSubject Mailed By Id","This should have gone out to 3 users: \n -Demo User \n -Arne \n -Senne \n enjoy boys :p");
    }
}
