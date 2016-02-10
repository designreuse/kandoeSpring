package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.Organisation;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class OrganisationServiceImpl implements OrganisationService{

    private final OrganisationRepository organisationRepository;

    @Autowired
    public OrganisationServiceImpl(OrganisationRepository organisationRepository) {
        this.organisationRepository = organisationRepository;
    }

    @Override
    public Organisation findOrganisationByName(String name) {
        return organisationRepository.findOrganisationByOrganisationName(name);
    }

    @Override
    public Organisation saveOrganisation(Organisation organisation) {
        return organisationRepository.save(organisation);
    }

    @Override
    public Organisation findOrganisationById(int Id) {
        return organisationRepository.findOrganisationByOrganisationId(Id);
    }
}
