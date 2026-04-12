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
        m.id AS id,
        m.name AS name,
        m.description AS description,            
        COALESCE(total.ingredient_all, 0) AS ingredientAll,
        COALESCE(matched.ingredient_have, 0) AS ingredientHave,
        (COALESCE(total.ingredient_all, 0) - COALESCE(matched.ingredient_have, 0)) AS ingredientNeed
    FROM menus m
    
    LEFT JOIN (
        SELECT 
            menu_id, 
            COUNT(*) AS ingredient_have
        FROM menu_ingredients mi            
        WHERE 
            :ingredientIdsSize > 0 
            AND mi.ingredient_id IN (:ingredientIds)
        GROUP BY menu_id
    ) AS matched ON m.id = matched.menu_id
    
    LEFT JOIN (
        SELECT 
            menu_id, 
            COUNT(*) AS ingredient_all
        FROM menu_ingredients
        GROUP BY menu_id
    ) AS total ON m.id = total.menu_id        
    WHERE 
        :ingredientIdsSize = 0 
        OR matched.ingredient_have > 0
    """, nativeQuery = true)
List<MenuIngredientDto> findMenuWithFilters(
    @Param("ingredientIds") List<Long> ingredientIds,
    @Param("ingredientIdsSize") int ingredientIdsSize
);

} 