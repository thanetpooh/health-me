package com.thanet.health_me.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.thanet.health_me.models.ERole;
import com.thanet.health_me.models.RoleModel;
import com.thanet.health_me.repositories.RoleRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    RoleRepository roleRepository;
    
    @PostConstruct
    public void seedRoles() {
        if (roleRepository.findByName(ERole.ADMIN).isPresent()) return;

        RoleModel admin = new RoleModel();
        admin.setName(ERole.ADMIN);
        roleRepository.save(admin);

        RoleModel user = new RoleModel();
        user.setName(ERole.USER);
        roleRepository.save(user);        
    }
}