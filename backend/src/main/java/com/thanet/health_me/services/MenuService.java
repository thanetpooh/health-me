package com.thanet.health_me.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thanet.health_me.dtos.IngredientRequestDto;
import com.thanet.health_me.dtos.InstructionRequestDto;
import com.thanet.health_me.dtos.MenuCreateRequestDto;
import com.thanet.health_me.dtos.MenuDetailRequestDto;
import com.thanet.health_me.dtos.MenuFullResponseDto;
import com.thanet.health_me.dtos.MenuOverviewDto;
import com.thanet.health_me.models.IngredientModel;
import com.thanet.health_me.models.InstructionModel;
import com.thanet.health_me.models.MenuDetailModel;
import com.thanet.health_me.models.MenuIngredientModel;
import com.thanet.health_me.models.MenuModel;
import com.thanet.health_me.repositories.IngredientRepository;
import com.thanet.health_me.repositories.MenuRepository;

import jakarta.transaction.Transactional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<MenuOverviewDto> getMenuOverviews(List<Long> ids) {
        List<Long> safeIds = (ids == null) ? List.of() : ids;
        return menuRepository.findMenuWithFilters(safeIds, safeIds.size());
    }

    public ResponseEntity<MenuFullResponseDto> getMenuDetailById(Long id) {
        return menuRepository.findMenuDetailById(id)
                .map(m -> {
                    MenuFullResponseDto dto = MenuFullResponseDto.from(m, objectMapper);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    public MenuModel createMenu(MenuCreateRequestDto dto) {
        MenuModel menu = mapBasicMenuInfo(dto);
        System.err.println("mapBasicMenuInfo2" + dto);

        System.err.println("mapBasicMenuInfo" + menu);

        if (dto.getDetail() != null) {
            menu.setMenuDetail(mapMenuDetail(dto.getDetail()));
        }

        if (dto.getIngredients() != null) {
            dto.getIngredients().forEach(ingDto -> menu.addIngredient(getOrCreateMenuIngredient(ingDto)));
        }

        if (dto.getInstructions() != null) {
            dto.getInstructions().forEach(insDto -> menu.addInstruction(mapInstruction(insDto)));
        }

        return menuRepository.save(menu);
    }

    private MenuModel mapBasicMenuInfo(MenuCreateRequestDto dto) {
        MenuModel menu = new MenuModel();
        menu.setName(dto.getName());
        menu.setDescription(dto.getDescription());
        menu.setNameImage(dto.getNameImage());
        menu.setUrlImage(dto.getUrlImage());
        return menu;
    }

    private MenuDetailModel mapMenuDetail(MenuDetailRequestDto detailDto) {
        MenuDetailModel detail = new MenuDetailModel();
        detail.setCalories(detailDto.getCalories());
        detail.setProtein(detailDto.getProtein());
        detail.setFat(detailDto.getFat());
        detail.setCarbohydrate(detailDto.getCarbs());
        return detail;
    }

    private MenuIngredientModel getOrCreateMenuIngredient(IngredientRequestDto ingDto) {
        IngredientModel masterIng = ingredientRepository.findByName(ingDto.getName())
                .orElseGet(() -> {
                    IngredientModel newIng = new IngredientModel();
                    newIng.setName(ingDto.getName());
                    newIng.setCategory(ingDto.getCategory());
                    newIng.setUnit(ingDto.getUnit());
                    return ingredientRepository.save(newIng);
                });

        MenuIngredientModel menuIng = new MenuIngredientModel();
        menuIng.setIngredientId(masterIng.getId());
        menuIng.setQuantity(ingDto.getQuantity());

        return menuIng;
    }

    private InstructionModel mapInstruction(InstructionRequestDto insDto) {
        InstructionModel instruction = new InstructionModel();
        instruction.setStepNumber(insDto.getStep());
        instruction.setDescription(insDto.getDescription());
        return instruction;
    }

}
