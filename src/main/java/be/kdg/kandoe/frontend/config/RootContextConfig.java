package be.kdg.kandoe.frontend.config;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;

@Configuration
@Import(value = {BackendContextConfig.class})
//todo
/*@ComponentScan(basePackages = "be.kdg.kandoe.frontend.config.security.rest",
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Configuration.class)}
) */
public class RootContextConfig {

}
