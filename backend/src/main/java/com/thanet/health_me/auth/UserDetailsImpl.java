package com.thanet.health_me.auth;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.thanet.health_me.models.RoleModel;
import com.thanet.health_me.models.UserModel;

public class UserDetailsImpl implements UserDetails {

    private UserModel user;

    public UserDetailsImpl(UserModel user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();

        for (RoleModel role : user.getRoles()) {
            authorities.add(
                new SimpleGrantedAuthority("ROLE_" + role.getName().name())
            );
        }

        return authorities;
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }
    
    public UserModel getUser() {
    return user;
}
    
}