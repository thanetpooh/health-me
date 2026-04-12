package com.thanet.health_me.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.models.ERole;
import com.thanet.health_me.models.RoleModel;


@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    Optional<RoleModel> findByName(ERole name);    
} 
