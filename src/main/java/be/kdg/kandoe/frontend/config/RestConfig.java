package be.kdg.kandoe.frontend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
public class RestConfig extends RepositoryRestMvcConfiguration
{
    @Override
    public RepositoryRestConfiguration config()
    {
        RepositoryRestConfiguration config = super.config();
        config.setBaseUri("/api");
        return config;
    }
}
