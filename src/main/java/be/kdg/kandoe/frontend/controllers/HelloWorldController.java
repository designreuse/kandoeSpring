package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.frontend.DTO.*;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorldController {

    private final OrganisationService organisationService;

    @Autowired
    public HelloWorldController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("home");

        return mav;
    }
}
