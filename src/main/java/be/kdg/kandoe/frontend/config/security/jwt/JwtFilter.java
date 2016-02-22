package be.kdg.kandoe.frontend.config.security.jwt;

import be.kdg.kandoe.backend.services.api.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean{

    @Autowired
    private UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;

        String authHeader = req.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            HttpServletResponse res = (HttpServletResponse) response;
            /*res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().flush();   */

           /* res.setContentType("application/json");
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getOutputStream().println("{ \"error\": \"no token\" }");
            res.getOutputStream().flush(); */
            SecurityContextHolder.getContext().setAuthentication(null);

        } else {
            String token = authHeader.substring(7);
            String username = Jwts.parser().setSigningKey("teamiip2kdgbe")
                    .parseClaimsJws(token).getBody().getSubject();
            SecurityContextHolder.getContext().setAuthentication(new UserAuthentication(userService.findUserByUsername(username)));
        }

        chain.doFilter(request, response);
    }
}
