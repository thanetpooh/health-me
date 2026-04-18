package com.thanet.health_me.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {

    public String uploadFile(MultipartFile file, String folderName);
}
