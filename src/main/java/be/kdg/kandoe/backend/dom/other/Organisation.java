package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Organisation implements Serializable, Identifiable<Integer>{

    @Id
    @Column(name = "OrganisationId", nullable = false)
    @GeneratedValue
    private Integer organisationId;

    @Column(name = "OrganisationName", nullable = false, length = 255)
    private String organisationName;

    @Column(name = "Address")
    private String address;

    @Column(name="Logo")
    private String logoURL;

    @ManyToMany(targetEntity =  User.class, fetch = FetchType.EAGER)
    private List<User> users;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER)
    private List<User> organisers;

    //TODO
    public Organisation() {
    }

    public Organisation(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLogoURL() {
        return logoURL;
    }

    public void setLogoURL(String logoURL) {
        this.logoURL = logoURL;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<User> getOrganisers() {
        return organisers;
    }

    public void setOrganisers(List<User> organisers) {
        this.organisers = organisers;
    }

    @Override
    public Integer getId() {
        return organisationId;
    }
}
