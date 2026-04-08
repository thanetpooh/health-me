package com.thanet.health_me.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    public UserModel(){}
        
    public UserModel(String name, String email){
        this.name = name;
        this.email = email;
        this.role = Role.USER;
    }
   
    public UserModel(String name, String email,String password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = Role.USER;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() { 
        return role; 
    }
    
    public void setRole(Role role) {
         this.role = role; 
    }
}
