package com.thanet.health_me.dtos;

public class MenuIngredientItemDto {
    private Long ingredientId;
    private Double quantity;
    private String unit;
    
    public Long getIngredientId() { return ingredientId; }
    public void setIngredientId(Long ingredientId) { this.ingredientId = ingredientId; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
}