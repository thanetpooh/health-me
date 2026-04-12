package com.thanet.health_me.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.dtos.IngredientProjection;
import com.thanet.health_me.models.MenuIngredientModel;

@Repository
public interface IngredientRepository extends JpaRepository<MenuIngredientModel, Long> {
    @Query("SELECT i.id as id, i.name as name, i.category as category FROM IngredientModel i")
    List<IngredientProjection> findAllProjected();
}