package com.backend.Controller;

import com.backend.DTO.UserDto;
import com.backend.Exceptions.UserException;
import com.backend.Request.PicsartRequest;
import com.backend.Response.ChangeBgByImageResponse;
import com.backend.Response.PicsartResponse;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.ImageEnhanceAIService;
import com.backend.Service.UserService;
import com.backend.Util.MultipartFileResizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Slf4j
public class ImageEnhancerController {

    private final ImageEnhanceAIService imageEnhanceAIService;
    private final UserService userService;

    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file , Authentication authentication) throws UserException {

        UserDto user = userService.AuthenticateUser();

        byte[] imageBytes = imageEnhanceAIService.removeBackground(file);
        String Base64Image = Base64.getEncoder().encodeToString(imageBytes);

        user.setCredits(user.getCredits() - 1);
        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(Base64Image);
    }

    @PostMapping("/replace-background_prompt")
    public ResponseEntity<?> replaceBackgroundWithPrompt(
            @RequestParam("file") MultipartFile file,
            @RequestParam("prompt") String prompt ,
            Authentication auth
    ) throws UserException, IOException {
        // Validation - user exits or not
        UserDto user = userService.AuthenticateUser();

        MultipartFile multipartFile = MultipartFileResizer.resizeIfNeeded(file);
        byte[] image = imageEnhanceAIService.replaceBackgroundWithPrompt(multipartFile, prompt);
        String base64Image = Base64.getEncoder().encodeToString(image);

        user.setCredits(user.getCredits() - 1);
        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(base64Image);
    }

    @PostMapping("/replace-background_image")
    public ResponseEntity<?> replaceBackgroundWithImage (
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "bg_image" , required = false) MultipartFile bg_image,
            @RequestParam(value = "bg_image_url" , required = false) String bg_image_url,
            Authentication auth
    ) throws UserException, IOException {
            // Validation - user exits or not
        UserDto user = userService.AuthenticateUser();

        ChangeBgByImageResponse changeBgByImageResponse = imageEnhanceAIService.changeBackground(image , bg_image , bg_image_url);

        user.setCredits(user.getCredits() - 1);
        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.OK).body(changeBgByImageResponse);
    }

    @PostMapping("/upscale")
    ResponseEntity<?> upscaleImage (
            @RequestParam("image_file") MultipartFile imageFile,
            @RequestParam(value = "upscale_factor" , defaultValue = "2") String upscaleFactor,
            @RequestParam(value = "format" , defaultValue = "jpg") String format
    ) throws UserException {
        log.info("In controller image upscale factor =" + upscaleFactor);
        UserDto user = userService.AuthenticateUser();

        ChangeBgByImageResponse response = imageEnhanceAIService.imageUpscale(imageFile, upscaleFactor, format);
        log.info("Comeback from image enhancer service =" + upscaleFactor);
        if (user.getCredits() > 3) {
            user.setCredits(user.getCredits() - 3);
            userService.saveUser(user);
        }
        else {
            throw new UserException("You don't have enough Nitros to upscale your image.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/remove-text")
    public ResponseEntity<?> removeTextFromImageHandler(@RequestParam("image_file") MultipartFile imageFile) throws UserException {
        byte[] imageBytes = imageEnhanceAIService.removeTextFromImage(imageFile);
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body(base64Image);
    }


}
