package com.thanet.health_me.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.dtos.IngredientResponseDto;
import com.thanet.health_me.models.IngredientModel;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientModel, Long> {
    List<IngredientResponseDto> findAllProjectedBy();

    Optional<IngredientResponseDto> findProjectedById(Long id);

    Optional<IngredientModel> findByName(String name);
}