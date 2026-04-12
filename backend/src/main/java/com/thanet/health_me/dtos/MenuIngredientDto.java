package com.thanet.health_me.dtos;

public interface MenuIngredientDto {
    Long getId();
    String getName();
    String getDescription();
   
    Integer getIngredientAll();
    Integer getIngredientHave();
    Integer getIngredientNeed();
}