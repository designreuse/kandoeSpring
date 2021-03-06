package be.kdg.kandoe.frontend.config.orika.custom.mappers;

import be.kdg.kandoe.backend.dom.users.Address;
import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.frontend.DTO.UserDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper extends CustomMapper<User, UserDTO>{

    @Override
    public void mapAtoB(User source, UserDTO destination, MappingContext context)
    {
        mapperFacade.map(source.getPerson(), destination.getPerson());
        if(source.getPerson().getAddress() != null)
            mapperFacade.map(source.getPerson().getAddress(), destination.getPerson().getAddress());

        //because we don't want to expose password
        destination.setPassword(null);
    }

    @Override
    public void mapBtoA(UserDTO source, User destination, MappingContext context)
    {
        if (source.getPassword() != null) destination.setPassword(source.getPassword());
        mapperFacade.map(source.getPerson(), destination.getPerson());
        if(source.getPerson().getAddress() != null)
        {
            if(destination.getPerson().getAddress() == null){
                destination.getPerson().setAddress(new Address());
            }
        }
            mapperFacade.map(source.getPerson().getAddress(), destination.getPerson().getAddress());
    }
}
