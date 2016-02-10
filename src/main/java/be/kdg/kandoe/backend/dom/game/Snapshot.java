package be.kdg.kandoe.backend.dom.game;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class Snapshot implements Serializable, Identifiable<Integer>{

    @Id
    @Column(name = "SnapshotId", nullable = false)
    @GeneratedValue
    private Integer snapshotId;

    @ManyToOne(targetEntity = Session.class)
    private Session session;

    //todo state off sesion


    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    @Override
    public Integer getId() {
        return snapshotId;
    }
}
