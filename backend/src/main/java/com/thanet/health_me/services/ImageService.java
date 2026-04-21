package com.thanet.health_me.services;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.thanet.health_me.dtos.MenuCreateRequestDto;

public interface ImageService {

    public ResponseEntity<Map> uploadImage(MenuCreateRequestDto menuCreateRequestDto);
}