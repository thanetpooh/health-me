package com.thanet.health_me.dtos;

public interface MenuOverviewDto {
    Long getId();

    String getName();

    String getDescription();

    Integer getTotalIngredients();

    Integer getAvailableIngredients();

    Integer getMissingIngredients();

    String getImageUrl();

}