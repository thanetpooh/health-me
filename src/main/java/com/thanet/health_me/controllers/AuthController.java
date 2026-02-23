package com.thanet.health_me.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.thanet.health_me.dtos.LoginRequestDto;
import com.thanet.health_me.dtos.RegisterRequestDto;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.UserRepository;

import jakarta.validation.Valid;



@RestController
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
        //TODO: process POST request            
            UserModel user = userRepository.findByEmail(loginRequestDto.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invaild email or password"));
            if(!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invaild email or password");
            }
            return "Login successful";
        }
    
}
