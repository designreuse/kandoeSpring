package be.kdg.kandoe.frontend.config.security;

import be.kdg.kandoe.backend.dom.users.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Jordan on 13/02/2016.
 */
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        User user = (User)authentication.getPrincipal();
        String token = Jwts.builder().setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS256, "teamiip2kdgbe").compact();
        response.setStatus(HttpServletResponse.SC_OK);
        response.getOutputStream().println(token);
    }
}