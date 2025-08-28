package com.backend.Controller;

import com.backend.Request.PicsartRequest;
import com.backend.Service.AiGenerateImageService;
import com.backend.Service.Impl.AiGenerateImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AiGenratedImageController {

    private final AiGenerateImageService aiGenerateImageService;

    @PostMapping("/text_to_image")
    public ResponseEntity<List<String>> textToImageHandler (
            @RequestParam String prompt,
            @RequestParam(defaultValue = "1024") int width,
            @RequestParam(defaultValue = "1024") int height,
            @RequestParam(defaultValue = "3") int count
    ) {
        PicsartRequest request = PicsartRequest.builder()
                .height(height)
                .width(width)
                .prompt(prompt)
                .count(count)
                .build();

        return ResponseEntity.ok().body(aiGenerateImageService.generateTextToImage(request));
    }
}
