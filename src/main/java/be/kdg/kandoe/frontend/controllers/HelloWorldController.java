package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.backend.dom.Organisation;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class HelloWorldController {

    private final OrganisationService organisationService;

    @Autowired
    public HelloWorldController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        Organisation org = organisationService.saveOrganisation(new Organisation("KdG"));

        ModelAndView mav = new ModelAndView();
        mav.addObject("org", org);
        mav.setViewName("home");

        return mav;
    }
}
