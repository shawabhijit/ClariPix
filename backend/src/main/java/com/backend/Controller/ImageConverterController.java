package com.backend.Controller;

import com.backend.Service.ImageConverterService;
import lombok.RequiredArgsConstructor;
import org.im4java.core.IM4JavaException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/convert")
@RequiredArgsConstructor
public class ImageConverterController {

    private final ImageConverterService imageConverterService;

    private static final List<String> SUPPORTED_FORMATS = Arrays.asList(
            "jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"
    );

    @PostMapping("/images")
    public ResponseEntity<?> convertImageFormat(
            @RequestParam("file") MultipartFile file,
            @RequestParam("format") String format) {

        try {
            // Validate input
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            if (!SUPPORTED_FORMATS.contains(format.toLowerCase())) {
                return ResponseEntity.badRequest().body("Unsupported format: " + format);
            }

            // Get file as bytes
            byte[] inputFile = file.getBytes();

            // Convert the image
            byte[] outputFile = imageConverterService.convertFormat(inputFile, format.toLowerCase());

            String base64Image = Base64.getEncoder().encodeToString(outputFile);

            // Set appropriate headers for binary data
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(getMediaTypeForFormat(format));
            headers.setContentLength(outputFile.length);
            headers.setContentDispositionFormData("attachment",
                    "converted." + format.toLowerCase());
            headers.setCacheControl("no-cache");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(base64Image);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading file: " + e.getMessage());
        } catch (InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Conversion interrupted: " + e.getMessage());
        } catch (IM4JavaException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("ImageMagick error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    private MediaType getMediaTypeForFormat(String format) {
        switch (format.toLowerCase()) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            default:
                return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

    @GetMapping("/supported-formats")
    public ResponseEntity<List<String>> getSupportedFormats() {
        return ResponseEntity.ok(SUPPORTED_FORMATS);
    }
}