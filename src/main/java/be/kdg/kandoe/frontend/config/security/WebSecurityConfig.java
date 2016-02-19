package be.kdg.kandoe.frontend.config.security;

import be.kdg.kandoe.backend.services.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Created by Jordan on 13/02/2016.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ComponentScan(basePackages = {"be.kdg.kandoe.frontend", "be.kdg.kandoe.frontend.config.security"},
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Configuration.class),
                @ComponentScan.Filter(type = FilterType.REGEX, pattern = "be.kdg.kandoe.frontend.config.security.rest.*")}
)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/").permitAll()
                    .anyRequest().permitAll()
                    .and()
                .formLogin()
                    .successHandler(new MyAuthenticationSuccessHandler())
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll()
                    .and()
                .csrf().disable();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder)
        ;
    }
}
