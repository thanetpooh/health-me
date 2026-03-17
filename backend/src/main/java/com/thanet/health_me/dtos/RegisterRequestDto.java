package com.thanet.health_me.dtos;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public RegisterRequestDto(String name, String email,String password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    public String getName(){
        return name;
    }

    public String getEamil(){
        return email;         
    }
 
    public String getPassword(){
        return password;        
    }

    public void setName(String name){
        this.name = name;        
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
}
