package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.services.api.MailService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.MailServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.apache.log4j.Logger;
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
 * An implementation of MailService over smtp using gmail.
 */
@Service
public class MailServiceImpl implements MailService {

    private final Logger logger = Logger.getLogger(MailServiceImpl.class);

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
    public void sendMailToUser(String recipient, String subject, String text) throws MailServiceException {
        String recipientEmail = null;
        try {
            recipientEmail = userService.findUserByUsername(recipient).getEmail();
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot send email to user with username " + recipient, e);
            throw new MailServiceException("Cannot send email to user with username " + recipient, e);
        }

        sendMail(recipientEmail,subject,text);
    }

    @Override
    public void sendMailToUsers(List<String> recipients, String subject, String text) throws MailServiceException {
        for (String r: recipients) {
            String recipientEmail = null;
            try {
                recipientEmail = userService.findUserByUsername(r).getEmail();
            } catch (UserServiceException e) {
                logger.warn(this.getClass().toString() + ": cannot send email to user with username " + r, e);
                throw new MailServiceException("Cannot send email to user with username " + r, e);
            }
            sendMail(recipientEmail,subject,text);
        }
    }

    @Override
    public void sendMailToUserByUserId(int id, String subject, String text) throws MailServiceException {
        String recipientEmail = null;
        try {
            recipientEmail = userService.findUserById(id).getEmail();
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot send email to user with id " + id, e);
            throw new MailServiceException("Cannot send email to user with id " + id, e);
        }

        sendMail(recipientEmail,subject,text);
    }

    @Override
    public void sendMailToUsersByUserId(List<Integer> ids, String subject, String text) throws MailServiceException {
        for (Integer id: ids) {
            String recipientEmail = null;
            try {
                recipientEmail = userService.findUserById(id).getEmail();
            } catch (UserServiceException e) {
                logger.warn(this.getClass().toString() + ": cannot send email to user with id " + id, e);
                throw new MailServiceException("Cannot send email to user with id " + id, e);
            }
            sendMail(recipientEmail,subject,text);
        }
    }

    private void sendMail(String recipientEmail,String subject, String text) throws MailServiceException {
        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("KandoeTeamI@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(recipientEmail));
            message.setSubject(subject);
            message.setText(text);

            Transport.send(message);

        } catch (MessagingException e) {
            logger.warn(this.getClass().toString() + ": failed to send email");
            throw new MailServiceException("Failed to send email", e);
        }
    }
}
