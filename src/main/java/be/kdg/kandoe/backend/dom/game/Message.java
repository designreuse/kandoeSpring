package be.kdg.kandoe.backend.dom.game;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Represents a message users can send to each other in a session.
 */
@Entity
public class Message implements Serializable, Identifiable<Integer>{

    @Id
    @Column(name = "MessageId", nullable = false)
    @GeneratedValue
    private Integer messageId;

    @Column(name = "Content", nullable = false)
    private String content;

    @ManyToOne(targetEntity = User.class)
    private User sender;

    @Column(name = "Date", nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime date;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    @Override
    public Integer getId() {
        return messageId;
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
