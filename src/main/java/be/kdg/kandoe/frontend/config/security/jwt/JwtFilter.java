package be.kdg.kandoe.frontend.config.security.jwt;

import be.kdg.kandoe.backend.services.api.UserService;
import be.kdg.kandoe.backend.services.impl.UserServiceImpl;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;

@Component
public class JwtFilter extends GenericFilterBean{

    private UserService userService;

    public JwtFilter(){

    }

    public JwtFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;

        String authHeader = req.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            SecurityContextHolder.getContext().setAuthentication(null);

        } else {
            String token = authHeader.substring(7);
            token=token.replace("\"","");
            String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                    .parseClaimsJws(token).getBody().getSubject();
            SecurityContextHolder.getContext().setAuthentication(new UserAuthentication(userService.findUserByUsername(username)));

        }
        chain.doFilter(request, response);

    }
}
