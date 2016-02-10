package be.kdg.kandoe.backend.persistence.api;


import be.kdg.kandoe.backend.dom.other.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationRepository extends JpaRepository<Organisation, Integer>{
    Organisation findOrganisationByOrganisationName(String organisationName);
    Organisation findOrganisationByOrganisationId(int Id);
}
