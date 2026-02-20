package com.thanet.health_me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.thanet.health_me.dtos.UserDto;
import com.thanet.health_me.models.UserModel;
import com.thanet.health_me.repositories.UserRepository;


@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
      

    @GetMapping("/users")
    public List<UserDto> getUsers() {        
        return userRepository.getUsers().stream()
        .map(user -> new UserDto(user.getName(),user.getEmail()))
        .toList();        
    }

    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable String id) {        
        return userRepository.getUsers().stream()
        .filter(user -> user.getId().equals(id))
        .map(user -> new UserDto(user.getName(),user.getEmail()))
        .findFirst()
        .orElse(null);
    }

    @PostMapping("/users")
    public String createUser(@RequestBody UserDto userDto) {
        userRepository.addUser(new UserModel(userDto.getName(), userDto.getEmail()));        
        return "create user successful";
    }
    
    @PutMapping("users/{id}")
    public String updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        UserModel updatedUser = new UserModel(id , userDto.getName(), userDto.getEmail());
        userRepository.editUser(updatedUser);        
        return "User updated successfully";
    }
    
    

}
