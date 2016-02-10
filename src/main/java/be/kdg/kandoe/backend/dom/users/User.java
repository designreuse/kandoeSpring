package be.kdg.kandoe.backend.dom.users;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.game.Session;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class User implements Serializable, Identifiable<Integer> {

    @Id
    @Column(name = "UserId", nullable = false)
    @GeneratedValue
    private Integer userId;

    @Column(name = "UserName", nullable = false)
    private String userName;

    @Column(name = "Surname", nullable = false)
    private String surname;

    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Column(name = "Email", nullable = false)
    private String email;

    @ManyToMany(targetEntity = Organisation.class, fetch = FetchType.EAGER)
    private List<Organisation> organisations;

    @OneToMany(targetEntity = Theme.class)
    private List<Theme> themes;

    @ManyToMany(targetEntity = Session.class)
    private List<Session> sessions;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Organisation> getOrganisations() {
        return organisations;
    }

    public void setOrganisations(List<Organisation> organisations) {
        this.organisations = organisations;
    }

    public List<Theme> getThemes() {
        return themes;
    }

    public void setThemes(List<Theme> themes) {
        this.themes = themes;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

    @Override
    public Integer getId() {
        return userId;
    }
}
