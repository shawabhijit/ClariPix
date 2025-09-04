package com.backend.Service.Impl;

import com.backend.Client.ChangeBackgroundClient;
import com.backend.Client.ClipDropClient;
import com.backend.Response.ChangeBgByImageResponse;
import com.backend.Response.PicsartErrorResponse;
import com.backend.Response.PicsartResponse;
import com.backend.Service.ImageEnhanceAIService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.DataInput;
import java.io.IOException;
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
    public byte[] imageUpscale(MultipartFile file, int width, int height) {
        return clipDropClient.imageUpscale(clipDropApiKey , file , width, height);
    }

    @Override
    public ChangeBgByImageResponse changeBackground(MultipartFile image, MultipartFile bg_image, String bg_image_url) throws IOException {
        try {
            return changeBackgroundClient.changeBackground(
                    picsartApiKey,
                    image,
                    bg_image,
                    bg_image_url,
                    "cutout",  // output_type
                    0,         // bg_blur
                    "fit",     // scale
                    false,     // auto_center
                    "PNG"      // format
            );
        }
        catch (Exception e) {
            String errorBody = e.getMessage();
            PicsartErrorResponse errorResponse = new ObjectMapper().readValue(errorBody, PicsartErrorResponse.class);
            throw new RuntimeException("Picsart API failed: " + errorResponse.getMessage());
        }
    }

}
