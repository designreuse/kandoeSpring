package be.kdg.kandoe.frontend.DTO;

import be.kdg.kandoe.backend.dom.users.Roles.Role;
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

    @Email
    private String email;

    private List<Role.RoleType> roleTypes;

    // Person and Address properties
    private PersonDTO person;

    public UserDTO()
    {
        this.person = new PersonDTO();
    }

    public Integer getUserId()
    {
        return userId;
    }

    public void setUserId(Integer userId)
    {
        this.userId = userId;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getOldPassword()
    {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword)
    {
        this.oldPassword = oldPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role.RoleType> getRoleTypes()
    {
        return roleTypes;
    }

    public void setRoleTypes(List<Role.RoleType> roleTypes)
    {
        this.roleTypes = roleTypes;
    }

    public PersonDTO getPerson()
    {
        return person;
    }

    public void setPerson(PersonDTO person)
    {
        this.person = person;
    }
}
