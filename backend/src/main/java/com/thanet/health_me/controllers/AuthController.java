package com.thanet.health_me.controllers;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanet.health_me.auth.UserDetailsImpl;
import com.thanet.health_me.dtos.JwtResponseDto;
import com.thanet.health_me.dtos.LoginRequestDto;
import com.thanet.health_me.dtos.RegisterRequestDto;
import com.thanet.health_me.models.RefreshTokenModel;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.RefreshTokenRepository;
import com.thanet.health_me.repositories.RoleRepository;
import com.thanet.health_me.repositories.UserRepository;
import com.thanet.health_me.services.RefreshTokenService;
import com.thanet.health_me.utils.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtils;

   @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> authenticateUser(@RequestBody LoginRequestDto user) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    user.getPassword()
            )
    );
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    UserModel userModel = userRepository.findByEmail(userDetails.getUsername());
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String accessToken = jwtUtils.generateToken(userDetails);
    RefreshTokenModel refreshToken = refreshTokenService.createRefreshToken(userModel.getId());
    ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.getToken())
            .httpOnly(true)
            .secure(false) 
            .path("/")
            .maxAge(24 * 60 * 60) 
            .sameSite("Lax")
            .build();    
    return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(new JwtResponseDto(accessToken));
}
    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequestDto user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Error: Username/Email is already taken!";
        }        
        UserModel newUser;
        newUser = new UserModel(
                user.getName(),
                user.getEmail(),
                encoder.encode(user.getPassword())
        );
        userRepository.save(newUser);
        return "User registered successfully!";
    }    

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken") String requestToken) {    
        return refreshTokenRepository.findByToken(requestToken)
            .map(token -> {
                if (refreshTokenService.isTokenExpired(token)) {
                    refreshTokenRepository.delete(token);
                    return ResponseEntity.status(401).body("Refresh token expired.");
                }
                UserModel user = token.getUserModel();
                UserDetailsImpl userDetails = new UserDetailsImpl(user);
                String newJwt = jwtUtils.generateToken(userDetails);
                return ResponseEntity.ok(Map.of("token", newJwt));
            })
            .orElse(ResponseEntity.badRequest().body("Invalid refresh token."));
}    

    @PostMapping("/logout")
public ResponseEntity<?> logoutUser(@CookieValue(name = "refreshToken", required = false) String requestToken) {
    if (requestToken != null) {
        refreshTokenRepository.findByToken(requestToken)
                .ifPresent(token -> refreshTokenRepository.delete(token));
    }    

    ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(false) 
            .path("/")
            .maxAge(0) 
            .build();

    return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body("Logged out successfully.");
}
}