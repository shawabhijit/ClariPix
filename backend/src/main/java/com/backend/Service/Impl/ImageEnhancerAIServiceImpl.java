package com.backend.Service.Impl;

import com.backend.Client.ClipDropClient;
import com.backend.Service.ImageEnhanceAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageEnhancerAIServiceImpl implements ImageEnhanceAIService {

    @Value("${clipdrop.api-key}")
    private String clipDropApiKey;

    private final ClipDropClient clipDropClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground(file,clipDropApiKey);
    }
}
