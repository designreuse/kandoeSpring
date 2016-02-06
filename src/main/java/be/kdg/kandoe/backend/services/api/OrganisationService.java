package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.dom.Organisation;

public interface OrganisationService {

    Organisation findOrganisationByName(String name);

    Organisation saveOrganisation(Organisation organisation);
}
