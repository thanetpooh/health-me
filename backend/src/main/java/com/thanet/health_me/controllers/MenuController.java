package com.thanet.health_me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thanet.health_me.dtos.MenuCreateRequestDto;
import com.thanet.health_me.dtos.MenuFullResponseDto;
import com.thanet.health_me.dtos.MenuOverviewDto;
import com.thanet.health_me.models.MenuModel;
import com.thanet.health_me.services.CloudinaryService;
import com.thanet.health_me.services.MenuService;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuOverviewDto>> getMenus(@RequestParam(required = false) List<Long> ids) {
        List<MenuOverviewDto> results = menuService.getMenuOverviews(ids);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuFullResponseDto> getMenuFullDetail(@PathVariable Long id) {
        return menuService.getMenuDetailById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMenu(
            @RequestPart("menu") String menuJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MenuCreateRequestDto dto = objectMapper.readValue(menuJson, MenuCreateRequestDto.class);

            if (file != null && !file.isEmpty()) {
                String imageUrl = cloudinaryService.uploadFile(file, "health_me_menus");
                if (imageUrl != null) {
                    dto.setUrlImage(imageUrl);
                    dto.setNameImage(file.getOriginalFilename());
                }
            }

            MenuModel createdMenu = menuService.createMenu(dto);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdMenu);

        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
