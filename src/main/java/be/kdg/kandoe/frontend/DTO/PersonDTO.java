package be.kdg.kandoe.frontend.DTO;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by amy on 13/02/2016.
 */
public class PersonDTO {
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    private AddressDTO addressDTO;

    public PersonDTO()
    {
        this.addressDTO = new AddressDTO();
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
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
