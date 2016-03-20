package be.kdg.kandoe.frontend.controllers;

import be.kdg.kandoe.backend.services.exceptions.*;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerExceptionHandler {

    private final Logger logger = Logger.getLogger(ControllerExceptionHandler.class);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({CardServiceException.class, ThemeServiceException.class, UserServiceException.class,
            OrganisationServiceException.class, SubThemeServiceException.class, SessionServiceException.class})
    public void handleConflict() {

    }
}
