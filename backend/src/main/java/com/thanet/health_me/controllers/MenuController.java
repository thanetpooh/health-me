package com.thanet.health_me.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanet.health_me.dtos.MenuDto;
import com.thanet.health_me.models.MenuModel;
import com.thanet.health_me.repositories.MenuRepository;



@RestController
@RequestMapping("/api/menus")
public class MenuController{
 

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping("/")
    public List<MenuDto> getMenus() {        
        return menuRepository.findAll().stream()
        .map(menu -> new MenuDto(menu.getName(),menu.getDescription()))
        .toList();
    }

    @GetMapping("/{id}")
    public MenuDto getMenuById(@PathVariable Long id) {                     
        return menuRepository.findById(id)
        .map((menu) -> new MenuDto(menu.getName(),menu.getDescription()))
        .orElse(null);        
    }

    @PostMapping("/")
    public Map createMenu(@RequestBody MenuDto menuDto) {            
        menuRepository.save(new MenuModel(menuDto.getName(),menuDto.getDescription()));            
        List<MenuModel> menus = menuRepository.findAll();         
        HashMap<String, List<MenuModel>> response = new HashMap<>();    
        response.put("menus", menus);        
        return response;
    }

    @PutMapping("/{id}")
    public MenuDto updateMenu(@PathVariable Long id, @RequestBody MenuDto menuDto){
        MenuModel menuModel = menuRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Menu not found"));
        menuModel.setName(menuDto.getName());
        menuModel.setDescription(menuDto.getDescription());
        menuRepository.save(menuModel);
        return new MenuDto(menuModel.getName(),menuModel.getDescription());
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