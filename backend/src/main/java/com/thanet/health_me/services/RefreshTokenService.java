package com.thanet.health_me.services;
import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.thanet.health_me.models.RefreshTokenModel;
import com.thanet.health_me.repositories.RefreshTokenRepository;
import com.thanet.health_me.repositories.UserRepository;



@Service
public class RefreshTokenService {
    @Value("${jwt.refreshExpirationMs}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository repo, UserRepository userRepo) {
        this.refreshTokenRepository = repo;
        this.userRepository = userRepo;
    }

    public RefreshTokenModel createRefreshToken(Long userId) {
        var token = new RefreshTokenModel();
        token.setUserModel(userRepository.findById(userId).get());
        token.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        token.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(token);
    }

    public boolean isTokenExpired(RefreshTokenModel token) {
        return token.getExpiryDate().isBefore(Instant.now());
    }
}