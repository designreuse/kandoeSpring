package be.kdg.kandoe.frontend.config.orika.custom.mappers.convertors;

import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Created by amy on 7/03/2016.
 */
@Component
public class LocalDateTimeConvertor extends BidirectionalConverter<LocalDateTime, LocalDateTime>
{

    @Override
    public LocalDateTime convertTo(LocalDateTime source, Type<LocalDateTime> destinationType)
    {
        return (LocalDateTime.from(source));
    }

    @Override
    public LocalDateTime convertFrom(LocalDateTime source, Type<LocalDateTime> destinationType)
    {
        return (LocalDateTime.from(source));
    }
}
