package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.other.Organisation;

public interface OrganisationService {

    Organisation findOrganisationById(int Id);

    Organisation findOrganisationByName(String name);

    Organisation saveOrganisation(Organisation organisation);
}
