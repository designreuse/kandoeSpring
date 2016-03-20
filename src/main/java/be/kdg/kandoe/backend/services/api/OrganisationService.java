package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;

import java.util.List;

/**
 * API to create, update and find organisations.
 * Also finds members and organisaers of an organisation.
 */
public interface OrganisationService {

    /**
     * Finds an organisation by id.
     * Initializes the themes and its cards and subthemes.
     * @param id the organisationId
     * @return Organisation
     * @throws OrganisationServiceException when the organisation cannot be found.
     */
    Organisation findOrganisationById(Integer id) throws OrganisationServiceException;

    /**
     * Find an organisation by name.
     * @param name the name of the organisation
     * @return Organisation
     * @throws OrganisationServiceException when the organisation cannot be found.
     */
    Organisation findOrganisationByName(String name) throws OrganisationServiceException;

    /**
     * Creates an organisation with the user with userId as id as first organiser
     * @param organisation the organisation to create
     * @param userId the userId of the user that wants to create the organisation
     * @return Organisation with an id
     * @throws OrganisationServiceException when the user cannot be found or the organisation is not valid
     */
    Organisation saveOrganisation(Organisation organisation, Integer userId) throws OrganisationServiceException;

    /**
     * Updates the organisation
     * @param org the organisation to update
     * @return updated Organisation
     * @throws OrganisationServiceException when the id is null
     */
    Organisation updateOrganisations(Organisation org) throws OrganisationServiceException;

    /**
     * Finds the organisers of a, organisation
     * @param id the id of the organisation
     * @return a list of users containing the organisers or null when the organisation cannot be found
     */
    List<User> findOrganisationOrganisers(Integer id);

    /**
     * Finds the members of an organisation
     * @param id the id of the organisation
     * @return a list of users containing the members or null when the organisation cannot be found
     */
    List<User> findOrganisationMembers(Integer id);

    /**
     * Add a user to an organisation by email
     * @param orgId the id of the organisation to add the user to
     * @param mail the email of the user to add
     * @param organiserId the id of the user taking the action
     * @return the new member
     * @throws OrganisationServiceException
     */
    User addMemberToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException;

    /**
     * Add an organiser to an organisation by email
     * @param orgId the id of the organisation to add the user to
     * @param mail the email of the user to add
     * @param organiserId the id of the user taking the action
     * @return the new organiser
     * @throws OrganisationServiceException
     */
    User addOrganiserToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException;
}
