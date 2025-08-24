package com.backend.controller;

import com.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file) {
        RemoveBgResponse response = null;
        Map<String , Object> responseMap = new HashMap<>();

        try {
            byte[] imageBytes = imageService.removeBackground(file);
            String Base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // user.setCredits(user.getCredits() - 1);
            //userService.saveUser(user);

            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(Base64Image);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    RemoveBgResponse.builder()
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                            .data(e.getMessage() + "-> Something went wrong while removing background")
                            .success(false)
                            .build()
            );
        }
    }
}
