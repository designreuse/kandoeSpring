package be.kdg.kandoe.frontend.config.orika;

import ma.glasnost.orika.Converter;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OrikaBeanMapper extends ConfigurableMapper{

    private MapperFactory mapperFactory;
    private ApplicationContext applicationContext;

    @Autowired
    public OrikaBeanMapper(ApplicationContext applicationContext)
    {
        super(false);
        this.applicationContext = applicationContext;

        this.init();
    }

    @Override
    protected void configure(MapperFactory factory)
    {
        this.mapperFactory = factory;
        addCustomMapperAndConvertors();
    }

    @Override
    protected void configureFactoryBuilder(final DefaultMapperFactory.Builder factoryBuilder)
    {
        factoryBuilder.mapNulls(false).build();
    }

    private void addCustomMapperAndConvertors()
    {
        final Map<String, Converter> converters = applicationContext.getBeansOfType(Converter.class);
        converters.values().forEach(this::addConverter);

        final Map<String, Mapper> mappers = applicationContext.getBeansOfType(Mapper.class);
        mappers.values().forEach(this::addMapper);
    }

    public void addConverter(final Converter<?, ?> converter)
    {
        mapperFactory.getConverterFactory().registerConverter(converter);
    }

    public void addMapper(final Mapper<?, ?> mapper)
    {
        mapperFactory.classMap(mapper.getAType(), mapper.getBType())
                .byDefault()
                .mapNulls(false)
                .mapNullsInReverse(false)
                .customize((Mapper) mapper)
                .register();
    }
}
