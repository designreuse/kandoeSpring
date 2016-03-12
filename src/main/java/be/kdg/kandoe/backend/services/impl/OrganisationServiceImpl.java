package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.hibernate.Hibernate;
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
        Organisation org = organisationRepository.findOne(id);
        Hibernate.initialize(org.getThemes());
        if(org.getThemes() != null)
            org.getThemes().stream().forEach(t -> {
                if(t.getCards() != null)
                    Hibernate.initialize(t.getCards());

                if(t.getSubThemes() != null)
                    Hibernate.initialize(t.getSubThemes());
            });

        return org;
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
            Organisation org = findOrganisationById(orgId);

            if(org == null){
                throw new OrganisationServiceException("Organisation not found");
            }

            if(!org.getOrganisers().stream().anyMatch(user -> user.getId().equals(organiserId))){
                throw new OrganisationServiceException("You are not an organiser");
            }

            if(org.getOrganisers().contains(u)){
                throw new OrganisationServiceException("This user is already an organiser");
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

    @Override
    public User addOrganiserToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException {
        try {
            User u = userService.findUserByEmail(mail);
            Organisation org = findOrganisationById(orgId);

            if(org == null){
                throw new OrganisationServiceException("Organisation not found");
            }

            if(!org.getOrganisers().stream().anyMatch(user -> user.getId().equals(organiserId))){
                throw new OrganisationServiceException("You are not an organiser");
            }

            //remove user from members list organisation
            Set<User> members = org.getUsers();
            if(members != null && members.contains(u)){
                members.remove(u);
                org.setUsers(members);
                List<Organisation> userOrgs = u.getOrganisations();
                userOrgs.remove(org);
                u.setOrganisations(userOrgs);
            }

            Set<User> organisers = org.getOrganisers();
            if(organisers == null){
                organisers = new TreeSet<>();
            }
            organisers.add(u);
            org.setOrganisers(organisers);
            /*List<Organisation> userOrgs = u.getOwnOrganisations();
            if(userOrgs == null){
                userOrgs = new ArrayList<>();
            }
            userOrgs.add(org);
            u.setOwnOrganisations(userOrgs);*/

            organisationRepository.save(org);

            return u;

        } catch (UserServiceException e){
            throw new OrganisationServiceException(e.getMessage());
        }
    }
}
