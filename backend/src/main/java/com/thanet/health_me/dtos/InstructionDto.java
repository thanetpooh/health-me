package com.thanet.health_me.dtos;

public class InstructionDto {
    private Integer stepNumber;
    private String description;
    
    public Integer getStepNumber() { return stepNumber; }
    public void setStepNumber(Integer stepNumber) { this.stepNumber = stepNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}