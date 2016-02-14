package be.kdg.kandoe.backend.dom.users;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by amy on 11/02/2016.
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Person implements Serializable, Identifiable<Integer> {

    @Column(name = "PersonId", nullable = false)
    @Id
    @GeneratedValue
    private Integer personid;

    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumns({@JoinColumn(name = "AddressId")})
    private Address address;

    @Column(name = "FirstName")
    private String firstname;

    @Column(name = "LastName")
    private String lastname;

    public Person()
    {
        this.address = new Address();
    }

    public Person(Address address, String firstname, String lastname) {
        this.address = address;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Override
    public Integer getId() {
        return personid;
    }
}
