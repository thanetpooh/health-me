package com.thanet.health_me.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "menus")
public class MenuModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;  
    
    @Column(name = "image_type")
    private String imageType;

    @Column(name = "image_name")
    private String imageName;
    
    @Lob
    @Column(name = "image_data")
    private byte[] imageData;
    
    @OneToOne(mappedBy = "menu", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private MenuDetailModel menuDetail;
    
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MenuIngredientModel> ingredients = new ArrayList<>();
    
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InstructionModel> instructions = new ArrayList<>();

    public void addIngredient(MenuIngredientModel ingredient) {
        ingredients.add(ingredient);
        ingredient.setMenu(this);
    }

    public void addInstruction(InstructionModel instruction) {
        instructions.add(instruction);
        instruction.setMenu(this);
    }

    public void setMenuDetail(MenuDetailModel detail) {
        this.menuDetail = detail;
        detail.setMenu(this);
    }

    public MenuDetailModel getMenuDetail() { return menuDetail; }
    public List<MenuIngredientModel> getIngredients() { return ingredients; }
    public List<InstructionModel> getInstructions() { return instructions; }
        
    public MenuModel() {}

    public MenuModel(String name, String description) {        
        this.name = name;
        this.description = description;
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

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    

}
