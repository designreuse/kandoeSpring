package be.kdg.kandoe.frontend.DTO;

import org.springframework.hateoas.ResourceSupport;

import java.io.Serializable;

public class LoginDTO extends ResourceSupport implements Serializable {
    private String username;
    private String password;

    public LoginDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
