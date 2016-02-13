package be.kdg.kandoe.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("classpath:/be/kdg/kandoe/backend/datasources/organisation.sql")
    private Resource organisation;

    @Value("classpath:/be/kdg/kandoe/backend/datasources/user.sql")
    private Resource user;

    @Value("classpath:/be/kdg/kandoe/backend/datasources/person.sql")
    private Resource person;

    @Bean(name = "datasource")
    public DriverManagerDataSource datasource()
    {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");

        // datasource in-memory
        dataSource.setUrl("jdbc:h2:mem:Kandoe;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE");

        return dataSource;
    }

    @Bean
    public DataSourceInitializer dataSourceInitializer(final DataSource dataSource)
    {
        final ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(organisation);
        populator.addScript(person);
        populator.addScript(user);

        final DataSourceInitializer initializer = new DataSourceInitializer();
        initializer.setDataSource(dataSource);
        initializer.setDatabasePopulator(populator);
        return initializer;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
}
