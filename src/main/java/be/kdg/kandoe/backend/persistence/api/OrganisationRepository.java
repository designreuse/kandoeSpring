package be.kdg.kandoe.backend.persistence.api;


import be.kdg.kandoe.backend.dom.other.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Organisation with standard crud operations.
 * Can also find an organisation by its name
 */
public interface OrganisationRepository extends JpaRepository<Organisation, Integer>{
    Organisation findOrganisationByOrganisationName(String organisationName);
}
