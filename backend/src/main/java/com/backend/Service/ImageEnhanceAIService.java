package com.backend.Service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageEnhanceAIService {

    byte[] removeBackground(MultipartFile file);
}
