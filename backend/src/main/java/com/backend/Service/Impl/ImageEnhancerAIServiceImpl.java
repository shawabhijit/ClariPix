package com.backend.Service.Impl;

import com.backend.Client.ChangeBackgroundClient;
import com.backend.Client.ClipDropClient;
import com.backend.Response.PicsartResponse;
import com.backend.Service.ImageEnhanceAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageEnhancerAIServiceImpl implements ImageEnhanceAIService {

    @Value("${clipdrop.api-key}")
    private String clipDropApiKey;

    @Value("${picsart.api-key}")
    String picsartApiKey;

    private final ClipDropClient clipDropClient;

    private final ChangeBackgroundClient changeBackgroundClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground(file,clipDropApiKey);
    }

    @Override
    public byte[] replaceBackgroundWithPrompt(MultipartFile file, String prompt) {
        return clipDropClient.replaceBackground(clipDropApiKey , file , prompt);
    }

    @Override
    public PicsartResponse changeBackground(MultipartFile image, MultipartFile bg_image, String bg_image_url) {
        Map<String , Object> params = new HashMap<>();
        // Optional parameters
        params.put("output_type", "cutout");
        params.put("bg_blur", 0);
        params.put("scale", "fit");
        params.put("auto_center", false);
        params.put("format", "PNG");

        return changeBackgroundClient.changeBackground(
                picsartApiKey,
                image,
                bg_image,
                bg_image_url,
                params
        );
    }


}
