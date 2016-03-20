package be.kdg.kandoe.backend.services.impl;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.persistence.api.OrganisationRepository;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.exceptions.OrganisationServiceException;
import be.kdg.kandoe.backend.services.exceptions.UserServiceException;
import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional(rollbackOn = {OrganisationServiceException.class, UserServiceException.class})
public class OrganisationServiceImpl implements OrganisationService{

    private final Logger logger = Logger.getLogger(OrganisationServiceImpl.class);
    private final OrganisationRepository organisationRepository;
    private final UserService userService;

    @Autowired
    public OrganisationServiceImpl(OrganisationRepository organisationRepository, UserService userService) {
        this.organisationRepository = organisationRepository;
        this.userService = userService;
    }

    @Override
    public Organisation findOrganisationById(Integer id) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": finding organisation with id " + id);
        if(id == null){
            logger.warn(this.getClass().toString() + ": cannot find organisation when id is null");
            throw new OrganisationServiceException("Cannot find organisation when id is null");
        }

        Organisation org = organisationRepository.findOne(id);

        if(org == null){
            logger.warn(this.getClass().toString() + ": cannot find organisation with id " + id);
            throw new OrganisationServiceException("Cannot find organisation with id " + id);
        }

        Hibernate.initialize(org.getThemes());
        if(org.getThemes() != null)
            org.getThemes().stream().forEach(t -> {
                if(t.getCards() != null)
                    Hibernate.initialize(t.getCards());

                if(t.getSubThemes() != null)
                    Hibernate.initialize(t.getSubThemes());
            });

        logger.info(this.getClass().toString() + ": found organisation with id " + id);
        return org;
    }

    @Override
    public Organisation findOrganisationByName(String name) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": finding organisation with name " + name);

        if(name == null){
            logger.warn(this.getClass().toString() + ": cannot find organisation when name is null");
            throw new OrganisationServiceException("Cannot find organisation when name is null");
        }

        Organisation org = organisationRepository.findOrganisationByOrganisationName(name);

        if(org == null){
            logger.warn(this.getClass().toString() + ": cannot find organisation with name " + name);
            throw new OrganisationServiceException("Cannot find organisation with name " + name);
        }

        return org;
    }

    @Override
    public Organisation saveOrganisation(Organisation organisation, Integer userId) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": creating organisation");

        if(organisation.getOrganisationName() == null){
            logger.warn(this.getClass().toString() + ": cannot create organisation without name");
            throw new OrganisationServiceException("Cannot create organisation without name");
        }

        User user = null;
        try {
            user = userService.findUserById(userId);
        } catch (UserServiceException e) {
            logger.warn(this.getClass().toString() + ": cannot find user when creating organisation with userId " + userId, e);
            throw new OrganisationServiceException("Cannot find user when creaing organisation with userId" + userId, e);
        }
        Set<User> organisers = new HashSet<>();
        organisers.add(user);
        organisation.setOrganisers(organisers);

        Organisation org = organisationRepository.save(organisation);
        logger.info(this.getClass().toString() + ": created organisation");
        return org;
    }

    @Override
    public Organisation updateOrganisations(Organisation org) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": updating organisation with id " + org.getId());

        if(org.getId() == null){
            logger.warn(this.getClass().toString() + ": cannot update organisation without id");
            throw new OrganisationServiceException("Cannot update organisation without id");
        }

        Organisation o = organisationRepository.save(org);

        logger.info(this.getClass().toString() + ": updated organisation with id " + org.getId());
        return o;
    }

    @Override
    public List<User> findOrganisationOrganisers(Integer id){
        logger.info(this.getClass().toString() + ": finding organisers of organisation with id " + id);
        Organisation org = organisationRepository.findOne(id);

        if(org != null){
            return new ArrayList<>(org.getOrganisers());
        }

        logger.info(this.getClass().toString() + ": found organisers of organisation with id " + id);
        return new ArrayList<>();
    }

    @Override
    public List<User> findOrganisationMembers(Integer id){
        logger.info(this.getClass().toString() + ": finding members of organisation with id " + id);
        Organisation org = organisationRepository.findOne(id);

        if(org != null){
            return new ArrayList<>(org.getUsers());
        }

        logger.info(this.getClass().toString() + ": found members of organisation with id " + id);
        return new ArrayList<>();
    }

    @Override
    public User addMemberToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": adding a member to an organisation");
        try {
            User u = userService.findUserByEmail(mail);
            Organisation org = findOrganisationById(orgId);

            if(org == null){
                logger.warn(this.getClass().toString() +
                        ": failed to add member to organisation because organisation cannot be found");
                throw new OrganisationServiceException("Organisation not found");
            }

            if(!org.getOrganisers().stream().anyMatch(user -> user.getId().equals(organiserId))){
                logger.warn(this.getClass().toString() +
                        ": failed to add member to organisation because the user that is taking the action is not an organiser");
                throw new OrganisationServiceException("You are not an organiser");
            }

            if(org.getOrganisers().contains(u)){
                logger.warn(this.getClass().toString() +
                        ": failed to add member to organisation because the user already is an organiser");
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

            logger.info(this.getClass().toString() + ": added member to organisation");
            return u;

        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": failed to add member to organisation because user cannot be found", e);
            throw new OrganisationServiceException("Failed to add member to organisation because user cannot be found", e);
        }
    }

    @Override
    public User addOrganiserToOrganisation(Integer orgId, String mail, Integer organiserId) throws OrganisationServiceException {
        logger.info(this.getClass().toString() + ": adding an organiser to an organisation");
        try {
            User u = userService.findUserByEmail(mail);
            Organisation org = findOrganisationById(orgId);

            if(org == null){
                logger.warn(this.getClass().toString() +
                        ": failed to add organiser to organisation because organisation cannot be found");
                throw new OrganisationServiceException("Organisation not found");
            }

            if(!org.getOrganisers().stream().anyMatch(user -> user.getId().equals(organiserId))){
                logger.warn(this.getClass().toString() +
                        ": failed to add organiser to organisation because the user that is taking the action is not an organiser");
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
            List<Organisation> userOrgs = u.getOwnOrganisations();
            if(userOrgs == null){
                userOrgs = new ArrayList<>();
            }
            userOrgs.add(org);
            u.setOwnOrganisations(userOrgs);

            organisationRepository.save(org);

            logger.info(this.getClass().toString() + ": added an organiser to an organisation");
            return u;

        } catch (UserServiceException e){
            logger.warn(this.getClass().toString() + ": failed to add organiser to organisation because user cannot be found", e);
            throw new OrganisationServiceException("Failed to add organiser to organisation because user cannot be found", e);
        }
    }
}
