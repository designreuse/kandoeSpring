package be.kdg.kandoe.backend.services.exceptions;

/**
 * Created by amy on 15/11/2015.
 */
public class ConvertorException extends Exception {
    public ConvertorException(String message){
        super(message);
    }
    public ConvertorException(String message, Throwable cause){
        super(message,cause);
    }
}
