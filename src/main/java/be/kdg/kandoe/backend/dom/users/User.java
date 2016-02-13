package be.kdg.kandoe.backend.dom.users;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.game.CircleSession.Session;
import be.kdg.kandoe.backend.dom.users.Roles.Role;
import org.hibernate.annotations.Fetch;
import org.springframework.hateoas.Identifiable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
 */
@Entity
public class User implements Serializable, UserDetails, Identifiable<Integer> {

    @Id
    @Column(name = "UserId", nullable = false)
    @GeneratedValue
    private Integer userId;

    @Column(name = "UserName", nullable = false)
    private String userName;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Email", nullable = false)
    private String email;

    @OneToOne(targetEntity = Person.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "PersonId", nullable = false)
    private Person person;

    @OneToMany(targetEntity = Role.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @Fetch(org.hibernate.annotations.FetchMode.SELECT)
    private List<Role> roles;

/*    @ManyToMany(targetEntity = Organisation.class, fetch = FetchType.EAGER)
    private List<Organisation> organisations;

    @ManyToMany(targetEntity = Organisation.class, fetch = FetchType.EAGER)
    private List<Organisation> ownOrganisations;

    @OneToMany(targetEntity = Theme.class)
    private List<Theme> themes;

    @ManyToMany(targetEntity = Session.class)
    private List<Session> sessions;*/

    public User()
    {
        this.person = new Person();
    }

    public User(String userName, String password, String email, Person person, List<Role> roles, List<Organisation> organisations, List<Theme> themes, List<Session> sessions) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.person = person;
        this.roles = roles;
/*        this.organisations = organisations;
        this.themes = themes;
        this.sessions = sessions;*/
    }

    public User(Person p, String userName, String password, List<Role> identities) {
        this.person = new Person();
        this.userName = userName;
        this.password = password;
        this.roles = identities;
    }

/*    public Integer getUserId() {
        return userId;
    }*/

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

/*    public List<Organisation> getOrganisations() {
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

    public List<Organisation> getOwnOrganisations() {
        return ownOrganisations;
    }

    public void setOwnOrganisations(List<Organisation> ownOrganisations) {
        this.ownOrganisations = ownOrganisations;
    }*/

    @Override
    public Integer getId() {
        return userId;
    }
}
