package be.kdg.kandoe.backend.services.exceptions;

public class SubThemeServiceException extends Exception{
    public SubThemeServiceException(String message) {
        super(message);
    }

    public SubThemeServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
