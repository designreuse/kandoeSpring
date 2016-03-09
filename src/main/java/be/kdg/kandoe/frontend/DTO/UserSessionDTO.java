package be.kdg.kandoe.frontend.DTO;

/**
 * Created by amy on 9/03/2016.
 */
public class UserSessionDTO {
    private Integer userSessionId;
    private int userPosition;
    private UserDTO user;
    private SessionDTO session;

    public UserSessionDTO(){

    }

    public Integer getUserSessionId() {
        return userSessionId;
    }

    public void setUserSessionId(Integer userSessionId) {
        this.userSessionId = userSessionId;
    }

    public int getUserPosition() {
        return userPosition;
    }

    public void setUserPosition(int userPosition) {
        this.userPosition = userPosition;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public SessionDTO getSession() {
        return session;
    }

    public void setSession(SessionDTO session) {
        this.session = session;
    }
}
