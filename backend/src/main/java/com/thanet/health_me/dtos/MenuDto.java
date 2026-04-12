package com.thanet.health_me.dtos;

import java.util.List;

public class MenuDto {
    private Long id;
    private String name;
    private String description;


    private MenuDetailDto menuDetail; 
    private List<MenuIngredientItemDto> ingredients;
    private List<InstructionDto> instructions;

    public MenuDto(){}

    public MenuDto(Long id, String name, String description){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuDetailDto getMenuDetail() {
        return menuDetail;
    }

    public void setMenuDetail(MenuDetailDto menuDetail) {
        this.menuDetail = menuDetail;
    }

    public List<MenuIngredientItemDto> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<MenuIngredientItemDto> ingredients) {
        this.ingredients = ingredients;
    }

    public List<InstructionDto> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<InstructionDto> instructions) {
        this.instructions = instructions;
    }
    
}
