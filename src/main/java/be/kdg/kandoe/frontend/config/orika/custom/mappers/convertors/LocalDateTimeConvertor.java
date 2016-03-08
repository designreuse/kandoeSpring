package be.kdg.kandoe.frontend.config.orika.custom.mappers.convertors;

import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Created by amy on 7/03/2016.
 */
@Component
public class LocalDateTimeConvertor extends BidirectionalConverter<LocalDateTime, String>
{
    @Override
    public String convertTo(LocalDateTime source, Type<String> destinationType) {
        return source.format(DateTimeFormatter.ISO_DATE_TIME);
    }

    @Override
    public LocalDateTime convertFrom(String source, Type<LocalDateTime> destinationType) {
        return LocalDateTime.parse(source, DateTimeFormatter.ISO_DATE_TIME);
    }
}
