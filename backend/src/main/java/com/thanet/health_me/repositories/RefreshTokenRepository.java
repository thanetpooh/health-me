package com.thanet.health_me.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanet.health_me.models.RefreshTokenModel;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenModel, Long> {
    Optional<RefreshTokenModel> findByToken(String token);
}