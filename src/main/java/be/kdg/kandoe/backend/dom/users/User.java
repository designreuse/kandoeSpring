package be.kdg.kandoe.backend.dom.users;

import be.kdg.kandoe.backend.dom.game.CircleSession.UserSession;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.Roles.Role;
import org.hibernate.annotations.Fetch;
import org.springframework.hateoas.Identifiable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by amy on 10/02/2016.
 */

@Entity
public class User implements Serializable, UserDetails, Identifiable<Integer>{

    @Id
    @Column(name = "UserId", nullable = false)
    @GeneratedValue
    private Integer userId;

    @Column(name = "Username", nullable = false, unique = true)
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name= "NewUser", nullable = false)
    private boolean newUser;

    @Column(name="ProfilePicture")
    private String profilePicture;

@Column(name= "FacebookAccount", nullable = false)
    private boolean facebookAccount;
    @OneToOne(targetEntity = Person.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "PersonId", nullable = false)
    private Person person;

    @OneToMany(targetEntity = Role.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @Fetch(org.hibernate.annotations.FetchMode.SELECT)
    private List<Role> roles;

    @ManyToMany(targetEntity = Organisation.class)
    @JoinTable(name = "org_users", joinColumns = @JoinColumn(name = "UserId"), inverseJoinColumns = @JoinColumn(name = "OrganisationId"))
    private List<Organisation> organisations;

    @ManyToMany(targetEntity = Organisation.class)
    @JoinTable(name = "org_owners", joinColumns = @JoinColumn(name = "UserId"), inverseJoinColumns = @JoinColumn(name = "OrganisationId"))
    private List<Organisation> ownOrganisations;

    @OneToMany(targetEntity = Theme.class)
    private List<Theme> themes;

    @OneToMany(targetEntity = UserSession.class)
    private List<UserSession> userSessions;

    public User()
    {
        this.person = new Person();
        this.newUser = true;
    }

    public User(String username, String password, String email, Person person, List<Role> roles, List<Organisation> organisations, List<Theme> themes, List<UserSession> userSessions) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.person = person;
        this.roles = roles;
        this.organisations = organisations;
        this.themes = themes;
        this.userSessions = userSessions;
        this.newUser = true;
    }

    public User(Person p, String username, String password, List<Role> identities) {
        this.person = p;
        this.username = username;
        this.password = password;
        this.roles = identities;
        this.newUser = true;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if(roles != null) {
            roles.forEach(role -> authorities.addAll(role.getAuthorities()));
        }
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
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

    public boolean isNewUser() {
        return newUser;
    }

    public void setNewUser(boolean newUser) {
        this.newUser = newUser;
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

    public List<UserSession> getUserSessions() {
        return userSessions;
    }

    public void setUserSessions(List<UserSession> sessions) {
        this.userSessions = sessions;
    }

    public List<Organisation> getOwnOrganisations() {
        return ownOrganisations;
    }

    public void setOwnOrganisations(List<Organisation> ownOrganisations) {
        this.ownOrganisations = ownOrganisations;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }


    @Override
    public Integer getId() {
        return userId;
    }

    public boolean isFacebookAccount() {
        return facebookAccount;
    }

    public void setFacebookAccount(boolean facebookAccount) {
        this.facebookAccount = facebookAccount;
    }
}






