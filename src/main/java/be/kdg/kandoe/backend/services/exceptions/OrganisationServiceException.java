package be.kdg.kandoe.backend.services.exceptions;

public class OrganisationServiceException extends Exception{
    public OrganisationServiceException(String message) {
        super(message);
    }

    public OrganisationServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
