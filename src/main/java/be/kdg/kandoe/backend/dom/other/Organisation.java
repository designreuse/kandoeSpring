package be.kdg.kandoe.backend.dom.other;

import be.kdg.kandoe.backend.dom.users.User;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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
    @JoinTable(name = "org_users", joinColumns = @JoinColumn(name = "OrganisationId"), inverseJoinColumns = @JoinColumn(name = "UserId"))
    private Set<User> users;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinTable(name = "org_owners", joinColumns = @JoinColumn(name = "OrganisationId"), inverseJoinColumns = @JoinColumn(name = "UserId"))
    private Set<User> organisers;

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<User> getOrganisers() {
        return organisers;
    }

    public void setOrganisers(Set<User> organisers) {
        this.organisers = organisers;
    }

    @Override
    public Integer getId() {
        return organisationId;
    }

    public Integer getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(Integer organisationId) {
        this.organisationId = organisationId;
    }
}
