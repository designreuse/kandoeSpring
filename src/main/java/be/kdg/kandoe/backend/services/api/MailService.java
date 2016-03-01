package be.kdg.kandoe.backend.services.api;

import java.util.List;

/**
 * Created by Jordan on 1/03/2016.
 */
public interface MailService {
    void sendMailToUser(String recipient,String subject,String text);
    void sendMailToUsers(List<String> recipients, String subject, String text);
    void sendMailToUserByUserId(int id,String subject,String text);
    void sendMailToUsersByUserId(List<Integer> ids,String subject,String text);
}
