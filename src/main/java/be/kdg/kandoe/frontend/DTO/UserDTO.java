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

    private String userName;

    private String password;

    private String oldPassword;

    @Email
    private String email;

    private List<Role.RoleType> roleTypes;

    // Person and Address properties
    private PersonDTO personDTO;

    public UserDTO()
    {
        this.personDTO = new PersonDTO();
    }

    public Integer getUserId()
    {
        return userId;
    }

    public void setUserId(Integer userId)
    {
        this.userId = userId;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
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

    public PersonDTO getPersonDTO()
    {
        return personDTO;
    }

    public void setPersonDTO(PersonDTO personDTO)
    {
        this.personDTO = personDTO;
    }
}
