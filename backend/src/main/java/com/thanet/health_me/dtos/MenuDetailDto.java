package com.thanet.health_me.dtos;

public class MenuDetailDto {
    private String protein;
    private String fat;
    private String carbohydrate;
    private Integer calories;
    
    public String getProtein() { return protein; }
    public void setProtein(String protein) { this.protein = protein; }

    public String getFat() { return fat; }
    public void setFat(String fat) { this.fat = fat; }

    public String getCarbohydrate() { return carbohydrate; }
    public void setCarbohydrate(String carbohydrate) { this.carbohydrate = carbohydrate; }

    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
}