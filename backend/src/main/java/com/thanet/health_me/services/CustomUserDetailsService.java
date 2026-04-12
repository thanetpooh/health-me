package com.thanet.health_me.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.thanet.health_me.auth.UserDetailsImpl;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.UserRepository;
@Service
public class CustomUserDetailsService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepository.findByEmail(username);        
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username/email: " + username);
        }        
         return new UserDetailsImpl(user);
    }
}