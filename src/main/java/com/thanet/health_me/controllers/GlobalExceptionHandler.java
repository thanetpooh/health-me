package com.thanet.health_me.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;



// ใช้ประโยชน์จาก RestControllerAdvice,ExceptionHandler
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex){
    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getFieldErrors().forEach(error -> {
        String fieldName = error.getField();
        String errorMessage = error.getDefaultMessage();
        errors.put("message", fieldName + ": " + errorMessage);
    });

    return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatusExceptions(ResponseStatusException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getReason());
        return ResponseEntity.status(ex.getStatusCode()).body(errors);
    }

    @ExceptionHandler(JpaSystemException.class)
    public ResponseEntity<Map<String, String>> handleJpaSystemException(JpaSystemException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message" , "Email already exists");
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message" , "Email already exists 2");
        return ResponseEntity.badRequest().body(errors);
    }
}
