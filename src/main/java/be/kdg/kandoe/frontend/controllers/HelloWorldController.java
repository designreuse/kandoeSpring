package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.frontend.DTO.*;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.services.api.OrganisationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorldController {

    private final Logger logger = Logger.getLogger(HelloWorldController.class);
    private final OrganisationService organisationService;

    @Autowired
    public HelloWorldController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    //todo delete if it turns out we don't need it
    /*@RequestMapping(value = "/", method = RequestMethod.GET)
     public ModelAndView index() {

        logger.info("testetestetqeteqteer");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");

        return mav;
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView home() {

        logger.info("testetestetqeteqteer");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");

        return mav;
    }       */
}
