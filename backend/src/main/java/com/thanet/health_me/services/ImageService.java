package com.thanet.health_me.services;


import org.springframework.http.ResponseEntity;

import java.util.Map;

import com.thanet.health_me.dtos.MenuCreateRequestDto;
import com.thanet.health_me.models.MenuModel;

public interface ImageService {

    public ResponseEntity<Map> uploadImage(MenuCreateRequestDto menuCreateRequestDto);
}