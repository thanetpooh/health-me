package com.thanet.health_me.dtos;

public class LoginResponseDto {

    private String token;
    private String name;
    private String email;
    private String message;

    public LoginResponseDto(String token, String name, String email, String message){
        this.token = token;
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public String getToken(){
        return token;
    }

    public String getName(){
        return name;
    }

    public String getEmail(){
        return email;
    }

    public String getMessage(){
        return message;
    }

    public void setToken(String token){
        this.token = token;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setMessage(String message){
        this.message = message;
    }

    
}
