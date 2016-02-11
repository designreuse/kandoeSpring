package be.kdg.kandoe.backend.dom.users.Roles;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.util.Collection;

/**
 * Created by amy on 11/02/2016.
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("ROLE_ORGANISER")
public class Organiser extends Role {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public RoleType getRoleType() {
        return null;
    }
}
