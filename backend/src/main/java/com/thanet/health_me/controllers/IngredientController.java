package com.thanet.health_me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanet.health_me.dtos.IngredientProjection;
import com.thanet.health_me.repositories.IngredientRepository;



@RestController
@RequestMapping("/api/ingredients")
public class IngredientController{
     
    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public List<IngredientProjection> getAllIngredients() {            
        return ingredientRepository.findAllProjected();
    }

}