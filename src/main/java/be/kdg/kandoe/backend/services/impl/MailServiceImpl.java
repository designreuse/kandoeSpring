package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.services.api.MailService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * Created by Jordan on 1/03/2016.
 */
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    UserService userService;

    private Properties props = new Properties();
    private Session session;

    public MailServiceImpl() {
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("KandoeTeamI@gmail.com", "KandoeTeamI1");
                    }
                });
    }

    @Override
    public void sendMailToUser(String recipient, String subject, String text) {
        String recipientEmail = userService.findUserByUsername(recipient).getEmail();

        sendMail(recipientEmail,subject,text);
    }

    @Override
    public void sendMailToUsers(List<String> recipients, String subject, String text) {
        for (String r: recipients) {
            String recipientEmail = userService.findUserByUsername(r).getEmail();
            sendMail(recipientEmail,subject,text);
        }
    }

    @Override
    public void sendMailToUserByUserId(int id, String subject, String text) {
        String recipientEmail = userService.findUserById(id).getEmail();

        sendMail(recipientEmail,subject,text);
    }

    @Override
    public void sendMailToUsersByUserId(List<Integer> ids, String subject, String text) {
        for (Integer id: ids) {
            String recipientEmail = userService.findUserById(id).getEmail();
            sendMail(recipientEmail,subject,text);
        }
    }

    private void sendMail(String recipientEmail,String subject, String text){
        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("KandoeTeamI@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(recipientEmail));
            message.setSubject(subject);
            message.setText(text);

            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
