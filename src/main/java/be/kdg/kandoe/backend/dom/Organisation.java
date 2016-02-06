package be.kdg.kandoe.backend.dom;

import org.springframework.hateoas.Identifiable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Organisation implements Serializable, Identifiable<Integer>{

    @Id
    @Column(name = "OrganisationId", nullable = false)
    @GeneratedValue
    private Integer organisationId;

    @Column(name = "OrganisationName", nullable = false, length = 255)
    private String organisationName;

    public Organisation(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    @Override
    public Integer getId() {
        return organisationId;
    }
}
