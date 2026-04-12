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
    private String protein;

    @Column(name = "fat")
    private String fat;

    @Column(name = "carbohydrate")
    private String carbohydrate;

    @Column(name = "calories")
    private Integer calories;

    public MenuDetailModel() {}

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public MenuModel getMenu() { return menu; }
    public void setMenu(MenuModel menu) { this.menu = menu; }

    public String getProtein() { return protein; }
    public void setProtein(String protein) { this.protein = protein; }

    public String getFat() { return fat; }
    public void setFat(String fat) { this.fat = fat; }

    public String getCarbohydrate() { return carbohydrate; }
    public void setCarbohydrate(String carbohydrate) { this.carbohydrate = carbohydrate; }

    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }   
}