package be.kdg.kandoe.backend.dom.users.Roles;

import be.kdg.kandoe.backend.dom.users.User;
import be.kdg.kandoe.backend.services.Exceptions.UserServiceException;
import org.springframework.hateoas.Identifiable;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by amy on 11/02/2016.
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "RoleType", discriminatorType = DiscriminatorType.STRING)
public abstract class Role implements Identifiable<Integer>{
    @Id
    @GeneratedValue
    @Column(name = "RoleId", nullable = false)
    private Integer roleId;
    @ManyToOne(targetEntity = User.class)
    private User user;

    public static <T extends Role> boolean hasRole(User user, Class<T> role) throws UserServiceException
    {
        try
        {
            loadRole(user, role);
            return true;
        }
        catch (UserServiceException ex)
        {
            return false;
        }
    }

    public static <T extends Role> T loadRole(User user, Class<T> role) throws UserServiceException
    {
        List<Role> roles = user.getRoles();
        Optional<T> result = (Optional<T>) roles
                .stream()
                .filter(r -> role.isInstance(r))
                .findAny();

        if (!result.isPresent())
            throw new UserServiceException("Incorrect role for user");

        return result.get();
    }

    public static List<Role> createRoles(List<RoleType> roleTypes)
    {
        return roleTypes.stream().map(roleType -> toRole(roleType)).collect(Collectors.toList());
    }

    public static Role toRole(RoleType roleType)
    {
        switch (roleType)
        {
            case ROLE_ORGANISER:
                return new Organiser();
            default:
                return new Player();
        }
    }

    public Integer getId()
    {
        return roleId;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public abstract Collection<? extends GrantedAuthority> getAuthorities();

    public abstract RoleType getRoleType();

    public enum RoleType
    {
        ROLE_ORGANISER, ROLE_PLAYER
    }
}
