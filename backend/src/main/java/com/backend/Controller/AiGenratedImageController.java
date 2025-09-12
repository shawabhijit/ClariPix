package com.backend.Controller;

import com.backend.Exceptions.UserException;
import com.backend.Request.PicsartRequest;
import com.backend.Service.AiGenerateImageService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AiGenratedImageController {

    private final AiGenerateImageService aiGenerateImageService;

    @PostMapping("/text_to_image/create")
    public ResponseEntity<?> textToImageHandler (
            @RequestBody PromptRequest request,
            @RequestParam(defaultValue = "1024" , required = false) int width,
            @RequestParam(defaultValue = "1024" , required = false) int height,
            @RequestParam(defaultValue = "3" , required = false) int count
    ) throws Exception {

        if (request.getPrompt() == null || request.getPrompt().isEmpty()) {
            return ResponseEntity.badRequest().body("Please provide a prompt");
        }
        PicsartRequest pRequest = PicsartRequest.builder()
                .height(height)
                .width(width)
                .prompt(request.getPrompt())
                .count(count)
                .build();

        return ResponseEntity.ok().body(aiGenerateImageService.generateTextToImage(pRequest));
    }

    @GetMapping("/images/{inferenceId}")
    public ResponseEntity<?> getAllAiGeneratedImages (@PathVariable String inferenceId) {
        return ResponseEntity.ok().body(aiGenerateImageService.getGeneratedImages(inferenceId));
    }

    @Data
    static public class PromptRequest {
        private String prompt;
    }
}
