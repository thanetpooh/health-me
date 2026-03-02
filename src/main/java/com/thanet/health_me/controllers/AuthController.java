package com.thanet.health_me.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.thanet.health_me.dtos.LoginRequestDto;
import com.thanet.health_me.dtos.RegisterRequestDto;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.UserRepository;
import com.thanet.health_me.utils.JwtUtil;

import jakarta.validation.Valid;



@RestController
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwTUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwTUtil;
    } 

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequestDto registerRequestDto){        
        UserModel user = new UserModel(registerRequestDto.getName(), registerRequestDto.getEamil(),
        passwordEncoder.encode(registerRequestDto.getPassword()));
        userRepository.save(user);            
        return "Register successful";
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequestDto loginRequestDto) {                 
            UserModel user = userRepository.findByEmail(loginRequestDto.getEmail())        
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invaild email or password (1)"));            
            if(!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invaild email or password (2)");
            }                        
            try {                
                Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
                
        );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println("userDetail : " + userDetails);
            return jwtUtil.generateToken(userDetails.getUsername());    
            } catch (Exception e) {
                System.out.println("error  :" + e);
            }
            return "Please try agian";
        }
    
}
