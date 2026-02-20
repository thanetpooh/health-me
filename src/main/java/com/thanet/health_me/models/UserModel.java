package com.thanet.health_me.models;

public class UserModel {
    private String id;
    private String name;
    private String email;
        
    public UserModel(String name, String email){
        this.id = String.valueOf(System.currentTimeMillis());
        this.name = name;
        this.email = email;
    }
    
    public UserModel(String id, String name, String email){
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
    
    public String getId() {
        return id;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }
}
