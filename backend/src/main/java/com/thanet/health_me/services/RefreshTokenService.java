package com.thanet.health_me.services;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.thanet.health_me.models.RefreshTokenModel;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.RefreshTokenRepository;
import com.thanet.health_me.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class RefreshTokenService {
    @Value("${refreshExpirationMs}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository repo, UserRepository userRepo) {
        this.refreshTokenRepository = repo;
        this.userRepository = userRepo;
    }

    @Transactional
    public RefreshTokenModel createRefreshToken(Long userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        refreshTokenRepository.deleteByUserModel(user);
        refreshTokenRepository.flush();

        RefreshTokenModel token = new RefreshTokenModel();
        token.setUserModel(user);
        token.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        token.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(token);
    }

    public boolean isTokenExpired(RefreshTokenModel token) {
        return token.getExpiryDate().isBefore(Instant.now());
    }
}