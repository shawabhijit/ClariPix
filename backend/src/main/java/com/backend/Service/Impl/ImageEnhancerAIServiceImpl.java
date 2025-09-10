package com.backend.Service.Impl;

import com.backend.Client.ChangeBackgroundClient;
import com.backend.Client.ClipDropClient;
import com.backend.DTO.UserDto;
import com.backend.Exceptions.UserException;
import com.backend.Response.ChangeBgByImageResponse;
import com.backend.Response.PicsartErrorResponse;
import com.backend.Response.PicsartResponse;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.ImageEnhanceAIService;
import com.backend.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final UserService userService;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground(file,clipDropApiKey);
    }

    @Override
    public byte[] replaceBackgroundWithPrompt(MultipartFile file, String prompt) {
        return clipDropClient.replaceBackground(clipDropApiKey , file , prompt);
    }

    @Override
    public byte[] imageUpscale(MultipartFile file, Integer target_width, Integer target_height) {
        System.out.println("In service image → width=" + target_width + ", height=" + target_height);
        return clipDropClient.imageUpscale(
                clipDropApiKey,
                file,
                target_width,
                target_height
        );
    }

    @Override
    public byte[] removeTextFromImage(MultipartFile file) throws UserException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getName() == null || auth.getName().isEmpty()) {
            throw new UserException("You don't have permission to remove text from the image.");
        }
        UserDto user = userService.getUserByClerkId(auth.getName());
        // Validation : if exits and have credits
        if (user.getCredits() == 0) {
            throw new UserException("You don't have enough credits to remove text from the image.");
        }
        byte[] imageBytes =  clipDropClient.removeTextFromImage(clipDropApiKey , file);

        if (imageBytes != null) {
            user.setCredits(user.getCredits() - 1);
            userService.saveUser(user);
        }
        return imageBytes;
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
