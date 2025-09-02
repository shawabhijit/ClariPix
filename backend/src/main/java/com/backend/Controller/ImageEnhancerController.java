package com.backend.Controller;

import com.backend.DTO.UserDto;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.ImageEnhanceAIService;
import com.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageEnhancerController {

    private final ImageEnhanceAIService imageEnhanceAIService;
    private final UserService userService;

    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file , Authentication authentication) {
        RemoveBgResponse response = null;
        Map<String , Object> responseMap = new HashMap<>();
        try {
            if (authentication.getName() == null || authentication.getName().isEmpty()) {
                response = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .data("User doesn't have any permission to remove background")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDto user = userService.getUserByClerkId(authentication.getName());

            // Validation : if exits and have credits
            if (user.getCredits() == 0) {
                responseMap.put("message", "You do not have any credits");
                responseMap.put("creditBalance" , user.getCredits());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        RemoveBgResponse.builder()
                        .statusCode(HttpStatus.BAD_REQUEST)
                        .data(responseMap)
                        .success(false)
                );
            }

            byte[] imageBytes = imageEnhanceAIService.removeBackground(file);
            String Base64Image = Base64.getEncoder().encodeToString(imageBytes);

            user.setCredits(user.getCredits() - 1);
            userService.saveUser(user);

            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(Base64Image);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .data(e.getMessage() + "-> Something went wrong while removing background")
                    .success(false)
                    .build()
            );
        }
    }

    @PostMapping("/replace-background_prompt")
    public ResponseEntity<?> replaceBackgroundWithPrompt(@RequestParam("file") MultipartFile file, @RequestParam("prompt") String prompt , Authentication auth) {
        RemoveBgResponse response = null;
        Map<String , Object> responseMap = new HashMap<>();
        try {
            // Validation - user exits or not
            if (auth.getName().isEmpty() || auth.getName() == null) {
                response = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .data("User doesn't have any permission to remove background")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDto user = userService.getUserByClerkId(auth.getName());

            // Validation : if exits and have credits
            if (user.getCredits() == 0) {
                responseMap.put("message", "You do not have any credits");
                responseMap.put("creditBalance" , user.getCredits());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        RemoveBgResponse.builder()
                                .statusCode(HttpStatus.BAD_REQUEST)
                                .data(responseMap)
                                .success(false)
                );
            }

            byte[] image = imageEnhanceAIService.replaceBackgroundWithPrompt(file, prompt);
            String base64Image = Base64.getEncoder().encodeToString(image);

            user.setCredits(user.getCredits() - 1);
            userService.saveUser(user);

            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(base64Image);
        }
        catch (Exception e) {
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
