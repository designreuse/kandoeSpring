package be.kdg.kandoe.frontend.DTO;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;

/**
 * Created by amy on 13/02/2016.
 */
public class PersonDTO extends ResourceSupport implements Serializable {
    @NotEmpty
    private String firstname;
    @NotEmpty
    private String lastname;
    private AddressDTO addressDTO;

    public PersonDTO()
    {
        this.addressDTO = new AddressDTO();
    }

    public String getFirstname()
    {
        return firstname;
    }

    public void setFirstname(String firstname)
    {
        this.firstname = firstname;
    }

    public String getLastname()
    {
        return lastname;
    }

    public void setLastname(String lastname)
    {
        this.lastname = lastname;
    }

    public AddressDTO getaddressDTO()
    {
        return addressDTO;
    }

    public void setaddressDTO(AddressDTO addressDTO)
    {
        this.addressDTO = addressDTO;
    }

}
