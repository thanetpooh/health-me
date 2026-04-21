package com.thanet.health_me.dtos;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MenuFullResponseDto {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;

    private List<Map<String, Object>> ingredients;
    private List<Map<String, Object>> instructions;

    public static MenuFullResponseDto from(MenuRawDetailDto m, ObjectMapper mapper) {
        MenuFullResponseDto dto = new MenuFullResponseDto();
        dto.setId(m.getId());
        dto.setName(m.getName());
        dto.setDescription(m.getDescription());
        dto.setImageUrl(m.getImageUrl());

        try {
            if (m.getIngredients() != null) {
                dto.setIngredients(mapper.readValue(m.getIngredients(), new TypeReference<List<Map<String, Object>>>() {
                }));
            } else {
                dto.setIngredients(List.of());
            }

            if (m.getInstructions() != null) {
                dto.setInstructions(
                        mapper.readValue(m.getInstructions(), new TypeReference<List<Map<String, Object>>>() {
                        }));
            } else {
                dto.setInstructions(List.of());
            }

        } catch (JsonProcessingException e) {
            System.err.println("❌ Error for menu ID " + m.getId() + ": " + e.getMessage());
            dto.setIngredients(List.of());
            dto.setInstructions(List.of());
        }

        return dto;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Map<String, Object>> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Map<String, Object>> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Map<String, Object>> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<Map<String, Object>> instructions) {
        this.instructions = instructions;
    }

}
