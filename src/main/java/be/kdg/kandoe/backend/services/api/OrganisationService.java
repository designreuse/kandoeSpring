package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;

import java.util.List;

public interface OrganisationService {

    Organisation findOrganisationById(int Id);
    Organisation findOrganisationByName(String name);
    Organisation saveOrganisation(Organisation organisation, Integer userId);
    List<Organisation> findOrganisations();
    Organisation updateOrganisations(Organisation org);
    List<User> findOrganisationOrganisers(Integer id);
    List<User> findOrganisationMembers(Integer id);
    User addMemberToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException;
}
