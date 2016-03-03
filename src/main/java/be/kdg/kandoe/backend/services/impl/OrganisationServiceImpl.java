package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional(rollbackOn = {OrganisationServiceException.class, UserServiceException.class})
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
        Set<User> organisers = new HashSet<>();
        organisers.add(user);
        organisation.setOrganisers(organisers);
        return organisationRepository.save(organisation);
    }

    @Override
    public List<Organisation> findOrganisations() {
        return organisationRepository.findAll();
    }

    @Override
    public Organisation findOrganisationById(int id) {
        return organisationRepository.findOne(id);
    }

    @Override
    public Organisation updateOrganisations(Organisation org){
        return organisationRepository.save(org);
    }

    @Override
    public List<User> findOrganisationOrganisers(Integer id){
        Organisation org = organisationRepository.findOne(id);

        if(org != null){
            return new ArrayList<>(org.getOrganisers());
        }
        return new ArrayList<>();
    }

    @Override
    public List<User> findOrganisationMembers(Integer id){
        Organisation org = organisationRepository.findOne(id);

        if(org != null){
            return new ArrayList<>(org.getUsers());
        }
        return new ArrayList<>();
    }

    @Override
    public User addMemberToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException {
        try {
            User u = userService.findUserByEmail(mail);
            Organisation org =  findOrganisationById(orgId);

            if(org == null){
                throw new OrganisationServiceException("Organisation not found");
            }

            if(!org.getOrganisers().stream().anyMatch(user -> user.getId().equals(organiserId))){
                throw new OrganisationServiceException("You are not an organiser");
            }

            Set<User> members = org.getUsers();
            if(members == null){
                members = new TreeSet<>();
            }

            if(!members.contains(u)){
                members.add(u);
            }

            organisationRepository.save(org);

            return u;

        } catch (UserServiceException e){
            throw new OrganisationServiceException(e.getMessage());
        }
    }
}
