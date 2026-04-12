package com.thanet.health_me.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.dtos.MenuIngredientDto;
import com.thanet.health_me.models.MenuModel;

@Repository
public interface MenuRepository extends JpaRepository<MenuModel, Long> {

    @Query(value = """
        SELECT 
            m.name AS name,
            m.description as description,            
            COALESCE(total.ingredient_all, 0) AS ingredient_all,
            COALESCE(matched.ingredient_have, 0) AS ingredient_have,
            (COALESCE(total.ingredient_all, 0) - COALESCE(matched.ingredient_have, 0)) AS ingredient_need
        FROM menus m
        LEFT JOIN (
            SELECT 
                menu_id, 
                COUNT(*) AS ingredient_have
            FROM menu_ingredients mi
            WHERE mi.ingredient_id IN (:ingredientIds)
            GROUP BY menu_id
        ) AS matched ON m.id = matched.menu_id
        LEFT JOIN (
            SELECT 
                menu_id, 
                COUNT(*) AS ingredient_all
            FROM menu_ingredients
            GROUP BY menu_id
        ) AS total ON m.id = total.menu_id
        """, nativeQuery = true)
 
    List<MenuIngredientDto> findMenuIngredient(@Param("ingredientIds") List<Long> ingredientIds); 

} 