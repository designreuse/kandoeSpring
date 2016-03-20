package be.kdg.kandoe.backend.services.exceptions;

public class UserServiceException extends Exception
{
    public UserServiceException(String message) {
        super(message);
    }

    public UserServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
