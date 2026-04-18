package com.thanet.health_me.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.thanet.health_me.models.RefreshTokenModel;
import com.thanet.health_me.models.UserModel;

import jakarta.transaction.Transactional;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenModel, Long> {
    Optional<RefreshTokenModel> findByToken(String token);
    @Modifying
    @Transactional
    void deleteByUserModel(UserModel userModel);
}