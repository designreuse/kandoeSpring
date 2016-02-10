package be.kdg.kandoe.frontend.DTO;

/**
 * Created by Jordan on 10/02/2016.
 */
public class OrganisationDTO {
    private Integer organisationId;
    private String organisationName;
    private String omschrijving;
    public OrganisationDTO(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public Integer getId() {
        return organisationId;
    }

    public void setOrganisationId(int id){
        this.organisationId=id;
    }

    public void setOmschrijving(String omschrijving){
        this.omschrijving=omschrijving;
    }
}
