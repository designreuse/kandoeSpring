package be.kdg.kandoe.backend.services.exceptions;

public class CardServiceException extends Exception{
    public CardServiceException(String message) {
        super(message);
    }

    public CardServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
