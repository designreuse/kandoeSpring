package be.kdg.kandoe.frontend.DTO;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;

/**
 * Created by Jordan on 10/02/2016.
 */
public class OrganisationDTO extends ResourceSupport implements Serializable{
    private Integer organisationId;

    @NotEmpty
    private String organisationName;

    private String address;

    private String logoURL;

    public OrganisationDTO() {
    }

    public OrganisationDTO(String organisationName) {
        this.organisationName = organisationName;
    }

    public Integer getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(Integer organisationId) {
        this.organisationId = organisationId;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLogoUrl() {
        return logoURL;
    }

    public void setLogoUrl(String logoURL) {
        this.logoURL = logoURL;
    }
}
