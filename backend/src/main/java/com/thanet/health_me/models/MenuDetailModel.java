package com.thanet.health_me.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu_detail")
public class MenuDetailModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private MenuModel menu;

    @Column(name = "protein")
    private Double protein;

    @Column(name = "fat")
    private Double fat;

    @Column(name = "carbohydrate")
    private Double carbohydrate;

    @Column(name = "calories")
    private Double calories;

    public MenuDetailModel() {}

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public MenuModel getMenu() { return menu; }
    public void setMenu(MenuModel menu) { this.menu = menu; }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(Double carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

   
}