package be.kdg.kandoe.frontend.DTO;

import org.hibernate.validator.constraints.Email;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;
import java.util.List;

/**
 * Created by amy on 13/02/2016.
 */
public class UserDTO extends ResourceSupport implements Serializable {
    private Integer userId;

    private String username;

    private String password;

    private String oldPassword;

    private boolean facebookAccount;

    @Email
    private String email;

    private String profilePicture;

    // Person and Address properties
    private PersonDTO person;

    private int position;

    public UserDTO() {
        this.person = new PersonDTO();
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean isFacebookAccount() {
        return facebookAccount;
    }

    public void setFacebookAccount(boolean facebookAccount) {
        this.facebookAccount = facebookAccount;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
