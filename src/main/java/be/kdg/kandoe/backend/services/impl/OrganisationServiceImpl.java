package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrganisationServiceImpl implements OrganisationService{

    private final OrganisationRepository organisationRepository;
    private final UserService userService;

    @Autowired
    public OrganisationServiceImpl(OrganisationRepository organisationRepository, UserService userService) {
        this.organisationRepository = organisationRepository;
        this.userService = userService;
    }

    @Override
    public Organisation findOrganisationByName(String name) {
        return organisationRepository.findOrganisationByOrganisationName(name);
    }

    @Override
    public Organisation saveOrganisation(Organisation organisation, Integer userId) {

        User user =  userService.findUserById(userId);
        List<User> organisers = new ArrayList<>();
        organisers.add(user);

        organisation.setOrganisers(organisers);
        return organisationRepository.save(organisation);
    }

    @Override
    public List<Organisation> findOrganisations() {
        return organisationRepository.findAll();
    }

    @Override
    public Organisation findOrganisationById(int Id) {
        return organisationRepository.findOrganisationByOrganisationId(Id);
    }
}
