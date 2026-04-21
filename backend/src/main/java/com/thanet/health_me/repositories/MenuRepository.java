package com.thanet.health_me.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.dtos.MenuOverviewDto;
import com.thanet.health_me.dtos.MenuRawDetailDto;
import com.thanet.health_me.models.MenuModel;

@Repository
public interface MenuRepository extends JpaRepository<MenuModel, Long> {

    @Query(value = """
            SELECT
                m.id AS id,
                m.name AS name,
                m.description AS description,
                m.url_image AS imageUrl,
                COALESCE(total.totalIngredients, 0) AS totalIngredients,
                COALESCE(matched.availableIngredients, 0) AS availableIngredients,
                (COALESCE(total.totalIngredients, 0) - COALESCE(matched.availableIngredients, 0)) AS missingIngredients
            FROM menus m

            LEFT JOIN (
                SELECT
                    menu_id,
                    COUNT(*) AS availableIngredients
                FROM menu_ingredients mi
                WHERE
                    :ingredientIdsSize > 0
                    AND mi.ingredient_id IN (:ingredientIds)
                GROUP BY menu_id
            ) AS matched ON m.id = matched.menu_id

            LEFT JOIN (
                SELECT
                    menu_id,
                    COUNT(*) AS totalIngredients
                FROM menu_ingredients
                GROUP BY menu_id
            ) AS total ON m.id = total.menu_id
            WHERE
                :ingredientIdsSize = 0
                OR matched.availableIngredients > 0
            """, nativeQuery = true)
    List<MenuOverviewDto> findMenuWithFilters(
            @Param("ingredientIds") List<Long> ingredientIds,
            @Param("ingredientIdsSize") int ingredientIdsSize);

    @Query(value = """
            SELECT
                m.id AS id,
                m.name AS name,
                m.description AS description,
                m.url_image AS imageUrl,
                 jsonb_agg(jsonb_build_object(
                'ingredient_id', mi.ingredient_id,
                'name', i.ingredient_name,
                'quantity', mi.quantity,
                'unit', i.unit) order by mi.ingredient_id) AS ingredients,
                (
                  SELECT jsonb_agg(jsonb_build_object(
                      'step', sub_it.step_number,
                      'description', sub_it.description
                  ) ORDER BY sub_it.step_number)
                  FROM instructions sub_it
                  WHERE sub_it.menu_id = m.id
                ) AS instructions
            FROM menus m
            INNER JOIN menu_ingredients mi ON m.id = mi.menu_id
            INNER JOIN ingredients i ON mi.ingredient_id = i.id
            WHERE m.id = :id
            GROUP BY m.id
            """, nativeQuery = true)
    Optional<MenuRawDetailDto> findMenuDetailById(@Param("id") Long id);

}