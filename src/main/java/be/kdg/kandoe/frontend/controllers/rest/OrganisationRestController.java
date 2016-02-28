package be.kdg.kandoe.frontend.controllers.rest;

import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.frontend.DTO.OrganisationDTO;
import be.kdg.kandoe.frontend.assemblers.OrganisationAssembler;
import be.kdg.kandoe.frontend.config.security.jwt.UserAuthentication;
import ma.glasnost.orika.MapperFacade;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/organisations")
@ExposesResourceFor(OrganisationDTO.class)
public class OrganisationRestController {

    private final Logger logger = Logger.getLogger(OrganisationRestController.class);
    private final OrganisationService organisationService;
    private final OrganisationAssembler organisationAssembler;
    private final MapperFacade mapper;
    private final UserService userService;

    @Autowired
    public OrganisationRestController(OrganisationService organisationService, OrganisationAssembler organisationAssembler, MapperFacade mapper, UserService userService) {
        this.organisationService = organisationService;
        this.organisationAssembler = organisationAssembler;
        this.mapper = mapper;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<OrganisationDTO>> getOrganisations(@AuthenticationPrincipal User user) {
        if (user != null) {
            List<Organisation> orgs = organisationService.findOrganisations();

            return new ResponseEntity<>(organisationAssembler.toResources(orgs), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{organisationId}", method = RequestMethod.GET)
    public ResponseEntity<OrganisationDTO> getOrganisationById(@PathVariable(value = "organisationId") int orgId) {
        Organisation org = organisationService.findOrganisationById(orgId);
        return new ResponseEntity<>(organisationAssembler.toResource(org), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<OrganisationDTO> createOrganisation(@Valid @RequestBody OrganisationDTO organisationDTO,
                                                              @AuthenticationPrincipal User user) {
        if (user != null && user.getId() != null) {
            Organisation org_in = mapper.map(organisationDTO, Organisation.class);

            Organisation org_out = organisationService.saveOrganisation(org_in, user.getId());
            logger.info(this.getClass().toString() + ": adding new organisation " + org_out.getId());

            return new ResponseEntity<>(organisationAssembler.toResource(org_out), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //http://stackoverflow.com/questions/21329426/spring-mvc-multipart-request-with-json/25183266#25183266
    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<String> createOrganisation(@RequestPart("body") OrganisationDTO organisationDTO,
                                                              @RequestPart("file") MultipartFile file,
                                                              @AuthenticationPrincipal User user,
                                                              HttpServletRequest request) {

        if(user != null && user.getId() != null) {
            if(file.getContentType().split("/")[0].equals("image")){
                Organisation org_in = mapper.map(organisationDTO, Organisation.class);
                Organisation org_out = organisationService.saveOrganisation(org_in, user.getId());

                String newFilename = String.format("%d.%s", org_out.getId(), file.getOriginalFilename().split("\\.")[1]);
                String filePath = request.getServletContext().getRealPath("/resources/images/organisation/");
                File f = new File(filePath);
                if(!f.exists()){
                    f.mkdirs();
                }
                f = new File(filePath + "/" + newFilename);
                try {
                    file.transferTo(f);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                org_out.setLogoURL("resources/images/organisation/" + newFilename);
                organisationService.updateOrganisations(org_out);

                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            return new ResponseEntity<>("You have to select an image", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public ResponseEntity<List<OrganisationDTO>> getOrganisationsCurrentUser(@AuthenticationPrincipal User user){
        if(user != null && user.getUsername() != null){
            List<Organisation> orgs = userService.findOrganisations(user);

            return new ResponseEntity<>(organisationAssembler.toResources(orgs), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request){
        System.out.println(file.getName());
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getContentType());

        String filePath = request.getServletContext().getRealPath("/resources/images/organisation/");
        System.out.println(filePath);
        File f = new File(filePath);
        if(!f.exists()){
            f.mkdirs();
        }

        f = new File(filePath + "/" + file.getOriginalFilename());
        System.out.println(f.getAbsolutePath());
        try {
            file.transferTo(f);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("resources/images/organisation/" + file.getOriginalFilename(), HttpStatus.OK);
    }
}
