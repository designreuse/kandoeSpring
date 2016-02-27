package be.kdg.kandoe.frontend.DTO;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;

/**
 * Created by amy on 13/02/2016.
 */
public class PersonDTO extends ResourceSupport implements Serializable {
    private String firstname;
    private String lastname;
    private AddressDTO address;

    public PersonDTO()
    {
        this.address = new AddressDTO();
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

    public AddressDTO getAddress()
    {
        return address;
    }

    public void setAddress(AddressDTO address)
    {
        this.address = address;
    }

}
