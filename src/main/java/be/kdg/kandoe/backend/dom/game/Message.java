package be.kdg.kandoe.backend.dom.game;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 10/02/2016.
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
}
