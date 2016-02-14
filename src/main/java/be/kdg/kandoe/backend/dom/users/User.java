package be.kdg.kandoe.backend.dom.users;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.game.Session;
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
public class User implements Serializable, Identifiable<Integer>,UserDetails {

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

    @ManyToMany(targetEntity = Organisation.class, fetch = FetchType.EAGER)
    private List<Organisation> ownOrganisations;

    @OneToMany(targetEntity = Theme.class)
    private List<Theme> themes;

    @ManyToMany(targetEntity = Session.class)
    private List<Session> sessions;

    @Transient
    List<GrantedAuthority> roles;

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

    public List<Organisation> getOwnOrganisations() {
        return ownOrganisations;
    }

    public void setOwnOrganisations(List<Organisation> ownOrganisations) {
        this.ownOrganisations = ownOrganisations;
    }

    public List<GrantedAuthority> getRoles() {
        return roles;
    }

    public void addRole(GrantedAuthority role) {
        this.roles.add(role);
    }

    public void removeRole(GrantedAuthority role){
        this.roles.remove(role);
    }

    @Override
    public Integer getId() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return getPassword();
    }

    @Override
    public String getUsername() {
        return this.userName;
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
}
