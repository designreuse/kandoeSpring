/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package be.kdg.kandoe.backend.services.Exceptions;

/**
 * @author deketelw
 */
public class UserServiceException extends RuntimeException
{
    public UserServiceException(String message)
    {
        super(message);
    }
}
