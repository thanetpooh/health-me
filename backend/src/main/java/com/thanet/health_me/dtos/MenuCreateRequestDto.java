package com.thanet.health_me.dtos;

import java.util.List;

public class MenuCreateRequestDto {
    private String name;
    private String description;
    private String nameImage;
    private String urlImage;

    private MenuDetailRequestDto detail;

    private List<IngredientRequestDto> ingredients;
    private List<InstructionRequestDto> instructions;

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

    public String getNameImage() {
        return nameImage;
    }

    public void setNameImage(String nameImage) {
        this.nameImage = nameImage;
    }

    public MenuDetailRequestDto getDetail() {
        return detail;
    }

    public void setDetail(MenuDetailRequestDto detail) {
        this.detail = detail;
    }

    public List<IngredientRequestDto> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientRequestDto> ingredients) {
        this.ingredients = ingredients;
    }

    public List<InstructionRequestDto> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<InstructionRequestDto> instructions) {
        this.instructions = instructions;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

}