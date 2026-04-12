package com.thanet.health_me.dtos;

public class MenuSummaryDto {
    private Long id;
    private String name;
    private String description;

    private Integer ingredientAll;
    private Integer ingredientHave;
    private Integer ingredientNeed;

    public MenuSummaryDto(Long id, String name, String description, Integer ingredientAll, Integer ingredientHave,
            Integer ingredientNeed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredientAll = ingredientAll;
        this.ingredientHave = ingredientHave;
        this.ingredientNeed = ingredientNeed;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getIngredientAll() {
        return ingredientAll;
    }
    public void setIngredientAll(Integer ingredientAll) {
        this.ingredientAll = ingredientAll;
    }
    public Integer getIngredientHave() {
        return ingredientHave;
    }
    public void setIngredientHave(Integer ingredientHave) {
        this.ingredientHave = ingredientHave;
    }
    public Integer getIngredientNeed() {
        return ingredientNeed;
    }
    public void setIngredientNeed(Integer ingredientNeed) {
        this.ingredientNeed = ingredientNeed;
    }    
}
