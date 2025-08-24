package com.backend.service;

import com.backend.client.ClipDropClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {

    @Value("${clipdrop.api-key}")
    private String clipDropApiKey;

    private final ClipDropClient clipDropClient;

    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground(file,clipDropApiKey);
    }

}
