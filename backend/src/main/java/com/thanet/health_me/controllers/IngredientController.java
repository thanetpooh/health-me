package com.thanet.health_me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanet.health_me.dtos.IngredientResponseDto;
import com.thanet.health_me.models.IngredientModel;
import com.thanet.health_me.repositories.IngredientRepository;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public List<IngredientResponseDto> getAllIngredients() {
        return ingredientRepository.findAllProjectedBy();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientResponseDto> getIngredientById(@PathVariable Long id) {
        return ingredientRepository.findProjectedById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IngredientModel> createIngredient(@RequestBody IngredientModel ingredient) {
        IngredientModel saved = ingredientRepository.save(ingredient);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredientModel> updateIngredient(@PathVariable Long id,
            @RequestBody IngredientModel details) {
        return ingredientRepository.findById(id).map(existing -> {
            existing.setName(details.getName());
            existing.setCategory(details.getCategory());
            existing.setUnit(details.getUnit());

            return ResponseEntity.ok(ingredientRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Long id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return ResponseEntity.ok("ลบวัตถุดิบเรียบร้อยแล้ว");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ไม่พบวัตถุดิบไอดี: " + id);
    }
}