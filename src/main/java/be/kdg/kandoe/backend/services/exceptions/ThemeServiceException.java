package be.kdg.kandoe.backend.services.exceptions;

public class ThemeServiceException extends Exception{
    public ThemeServiceException(String message) {
        super(message);
    }

    public ThemeServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
