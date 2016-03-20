package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.services.exceptions.MailServiceException;

import java.util.List;

/**
 * API to send mails
 */
public interface MailService {
    /**
     * Send a mail to the user by username.
     * @param recipient the username of the user
     * @param subject the subject of the mail
     * @param text the content of the mail
     * @throws MailServiceException when user cannot be found or something else goes wrong
     */
    void sendMailToUser(String recipient,String subject,String text) throws MailServiceException;

    /**
     * Send a mail to multiple users by username.
     * @param recipients a list of the usernames of the users
     * @param subject the subject of the mail
     * @param text the content of the mail
     * @throws MailServiceException when user cannot be found or something else goes wrong
     */
    void sendMailToUsers(List<String> recipients, String subject, String text) throws MailServiceException;

    /**
     * Send a mail to the user by userId.
     * @param id the id of the user
     * @param subject the subject of the mail
     * @param text the content of the mail
     * @throws MailServiceException when user cannot be found or something else goes wrong
     */
    void sendMailToUserByUserId(int id,String subject,String text) throws MailServiceException;

    /**
     * Send a mail to multiple users by userId.
     * @param ids a list of the ids of the users
     * @param subject the subject of the mail
     * @param text the content of the mail
     * @throws MailServiceException when user cannot be found or something else goes wrong
     */
    void sendMailToUsersByUserId(List<Integer> ids,String subject,String text) throws MailServiceException;
}
