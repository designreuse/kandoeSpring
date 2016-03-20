package be.kdg.kandoe.backend.dom.users;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Holds the address of a person.
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class Address implements Serializable, Identifiable<Integer> {
    @Column(name = "AddressId", nullable = false)
    @Id
    @GeneratedValue
    private Integer addressid;

    @Column(name = "Street", nullable = true, length = 255)
    private String street;

    @Column(name = "Nr", nullable = true, length = 255)
    private String number;

    @Column(name = "Zip", nullable = true, length = 255)
    private String zip;

    @Column(name = "City", nullable = true, length = 255)
    private String city;

    public Address()
    {
    }

    public Address(String street, String number, String zip, String city)
    {
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.city = city;
    }

    public String getStreet()
    {
        return this.street;
    }

    public void setStreet(String street)
    {
        this.street = street;
    }

    public String getNumber()
    {
        return this.number;
    }

    public void setNumber(String number)
    {
        this.number = number;
    }

    public String getZip()
    {
        return this.zip;
    }

    public void setZip(String zip)
    {
        this.zip = zip;
    }

    public String getCity()
    {
        return this.city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public Integer getAddressid()
    {
        return addressid;
    }

    public void setId(Integer addressid)
    {
        this.addressid = addressid;
    }

    @Override
    public Integer getId() {
        return null;
    }

    public void setAddressid(Integer addressid) {
        this.addressid = addressid;
    }
}
