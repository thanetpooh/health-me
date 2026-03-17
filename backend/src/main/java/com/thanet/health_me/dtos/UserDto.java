package com.thanet.health_me.dtos;

import jakarta.validation.constraints.NotBlank;

public class UserDto {
    private String name;
    private String email;

    @NotBlank(message = "Email is required")
    public UserDto(String name, String email){
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}
