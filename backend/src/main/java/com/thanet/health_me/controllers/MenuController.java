package com.thanet.health_me.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thanet.health_me.dtos.InstructionDto;
import com.thanet.health_me.dtos.MenuDto;
import com.thanet.health_me.dtos.MenuDtoResponse;
import com.thanet.health_me.dtos.MenuIngredientDto;
import com.thanet.health_me.dtos.MenuIngredientItemDto;
import com.thanet.health_me.models.InstructionModel;
import com.thanet.health_me.models.MenuDetailModel;
import com.thanet.health_me.models.MenuIngredientModel;
import com.thanet.health_me.models.MenuModel;
import com.thanet.health_me.repositories.MenuRepository;



@RestController
@RequestMapping("/api/menus")
public class MenuController{
     
    @Autowired
    private MenuRepository menuRepository;

    @GetMapping
public ResponseEntity<List<MenuDtoResponse>> getMenus(
        @RequestParam(value = "ids", required = false) List<Long> ids) {

    System.out.println("Received IDs: " + ids);


    if (ids == null) {
        ids = List.of();
    }

    List<MenuIngredientDto> results =
            menuRepository.findMenuWithFilters(ids, ids.size());

    List<MenuDtoResponse> response = results.stream()
        .map(m -> new MenuDtoResponse(
            m.getId(),
            m.getName(),
            m.getDescription(),
            m.getIngredientAll(),
            m.getIngredientHave(),
            m.getIngredientNeed()
        ))
        .toList();

    return ResponseEntity.ok(response);
}

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getMenuImage(@PathVariable Long id) {    
        MenuModel menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ไม่พบเมนูรหัส: " + id));        
        if (menu.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(menu.getImageType()))
                .body(menu.getImageData());
    }

    @PostMapping
    public ResponseEntity<?> createMenu(@RequestPart("menu") String menuJson, @RequestPart("file") MultipartFile file) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    MenuDto menuDto = objectMapper.readValue(menuJson, MenuDto.class);    
    
    MenuModel newMenu = new MenuModel();
    newMenu.setName(menuDto.getName());
    newMenu.setDescription(menuDto.getDescription());    
    newMenu.setImageData(file.getBytes());
    newMenu.setImageType(file.getContentType());
    newMenu.setImageName(file.getOriginalFilename());
    
    if (menuDto.getMenuDetail() != null) {
        MenuDetailModel detail = new MenuDetailModel();
        detail.setProtein(menuDto.getMenuDetail().getProtein());
        detail.setFat(menuDto.getMenuDetail().getFat());
        detail.setCarbohydrate(menuDto.getMenuDetail().getCarbohydrate());
        detail.setCalories(menuDto.getMenuDetail().getCalories());
        
        newMenu.setMenuDetail(detail); 
    }
    
    if (menuDto.getIngredients() != null) {
        for (MenuIngredientItemDto ingDto : menuDto.getIngredients()) {
            MenuIngredientModel ing = new MenuIngredientModel();
            ing.setIngredientId(ingDto.getIngredientId());
            ing.setQuantity(ingDto.getQuantity());
            ing.setUnit(ingDto.getUnit());
            
            newMenu.addIngredient(ing);
        }
    }
    
    if (menuDto.getInstructions() != null) {
        for (InstructionDto instDto : menuDto.getInstructions()) {
            InstructionModel inst = new InstructionModel();
            inst.setStepNumber(instDto.getStepNumber());
            inst.setDescription(instDto.getDescription());
            
            newMenu.addInstruction(inst); 
        }
    }


    menuRepository.save(newMenu);    

    List<MenuModel> menus = menuRepository.findAll();
    HashMap<String, List<MenuModel>> response = new HashMap<>();
    response.put("menus", menus);
    return ResponseEntity.ok(response);
}
    
    @DeleteMapping("/{id}")    
    public String deleteMenu(@PathVariable Long id){
        try {
            menuRepository.deleteById(id);
        }catch(IllegalArgumentException e){
            System.out.println("💁" + e);
        }        
        return "delete menu successful";    
    }
}